package sj.sjesl.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.ReservationStatus;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.ReservationRepository;
import sj.sjesl.reservation.FacilityDateRequestDto;

import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class FTPUploader2 {

    final ReservationRepository reservationRepository ;
    final FacilityRepository facilityRepository;
    //저장할 파일을 target에 넣은 부분은 생략(각자 환경에 맞게 파일을 읽어서 넣어주시면 됩니다.)


    FTPClient ftp = null;

    public FTPUploader2(ReservationRepository reservationRepository, FacilityRepository facilityRepository) {
        this.reservationRepository = reservationRepository;
        this.facilityRepository = facilityRepository;
    }


    @Scheduled(cron = "*/10 * * * * *")
    public void printDate() throws Exception {
        String facility = "센B206";
        LocalDate date = LocalDate.of(2021, 12, 16);

        FacilityDateRequestDto requestDto = new FacilityDateRequestDto(facility, date);


        Facility facility1 = facilityRepository.findByName(requestDto.getFacility());
        LocalDateTime startDatetime = LocalDateTime.of(requestDto.getDate(), LocalTime.of(0, 0, 0));
        LocalDateTime endDatetime = LocalDateTime.of(requestDto.getDate(), LocalTime.of(23, 59, 59));
        System.out.println(facility1.getId()+"sssssssssssssssssssss");
        List<Reservation> reservations = reservationRepository
                .findAllByFacilityAndReservationStatusAndStartTimeBetween(facility1, ReservationStatus.COMPLETE, startDatetime, endDatetime);

        for( Reservation r: reservations)
            System.out.println(r.toString());




        Optional<Reservation> byId = reservationRepository.findById(1L);
//        reservations.get(0).getStartTime().get()
        System.out.println(reservations.get(0).getStartTime().getHour()+" "+String.format("%02d",reservations.get(0).getStartTime().getMinute()));
        System.out.println(reservations.get(0).getEndTime().getHour()+" "+reservations.get(0).getEndTime().getMinute());
        String startTime=reservations.get(0).getStartTime().getHour()+":"+String.format("%02d",reservations.get(0).getStartTime().getMinute());
        String endTime=reservations.get(0).getEndTime().getHour()+":"+String.format("%02d",reservations.get(0).getEndTime().getMinute());

        System.out.println("2222222222222222222");
        System.out.println(byId.get().toString());
        System.out.println("33333333333333333");
        String createfile = "C:\\Users\\vnddn\\OneDrive\\바탕 화면\\im\\import_20211111163004.csv";
        FileWriter fw = new FileWriter(createfile);
        fw.append("room_id,time,subject,prof,status,time2,subect2,prof2,status2\n" +
                "센B206,"+startTime+"~"+endTime+",컴퓨터공학과-캡스톤 디자인,권기학,수업 중,15:30~17:30,컴퓨터공학과-캡스톤 디자인,문현준,휴강");


        fw.flush();
        fw.close();

        String host="192.168.0.15";
        String user="cgESLUser";
        String pwd="cgESLPassword";
        File target =new File(createfile);

//        FtpClient ftp_ivr = new FtpClient(host, user, pwd, "");
//        boolean result = ftp_ivr.upload(target, "/Import");
//        System.out.println("FTP result : " + result);


        ftp = new FTPClient();
        ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
        int reply;
        ftp.connect(host,2121);//호스트 연결
        reply = ftp.getReplyCode();
        if (!FTPReply.isPositiveCompletion(reply)) {
            ftp.disconnect();
            throw new Exception("Exception in connecting to FTP Server");
        }
        ftp.login(user, pwd);//로그인
        ftp.setFileType(FTP.BINARY_FILE_TYPE);
        ftp.enterLocalPassiveMode();

        String localFileFullName="C:\\Users\\vnddn\\OneDrive\\바탕 화면\\im\\import_20211111163004.csv";
        String fileName = "import_20211111163004.csv";
        String hostDir="/Import/";
        try(InputStream input = new FileInputStream(new File(localFileFullName))){
            this.ftp.storeFile(hostDir + fileName, input);
            //storeFile() 메소드가 전송하는 메소드
        }

        System.out.println("Done");

//        ftp.uploadFile("C:\\Users\\vnddn\\OneDrive\\바탕 화면\\im\\import_20211111163004.csv", "import_20211111163004.csv", "/Import");
        ftp.logout();
        ftp.disconnect();
        System.out.println("Done");


    }



}


