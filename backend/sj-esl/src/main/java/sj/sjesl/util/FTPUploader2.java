package sj.sjesl.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sj.sjesl.entity.*;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.LabRepository;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.ReservationRepository;
import sj.sjesl.reservation.FacilityDateRequestDto;

import javax.transaction.Transactional;
import java.io.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Slf4j
@Component
public class FTPUploader2 {

    final ReservationRepository reservationRepository ;
    final FacilityRepository facilityRepository;
    final LabRepository labRepository;
    final MemberRepository memberRepository;
    //저장할 파일을 target에 넣은 부분은 생략(각자 환경에 맞게 파일을 읽어서 넣어주시면 됩니다.)






    FTPClient ftp = null;

    public FTPUploader2(ReservationRepository reservationRepository, FacilityRepository facilityRepository, LabRepository labRepository, MemberRepository memberRepository) {
        this.reservationRepository = reservationRepository;
        this.facilityRepository = facilityRepository;
        this.labRepository = labRepository;
        this.memberRepository = memberRepository;
    }


    @Scheduled(cron = "0 29/59 * * * *")
    @Transactional
    public void ESL_FTP() throws Exception {
        String facility = "센B206";
//        LocalDate date = LocalDate.of(2021, 12, 16);
        LocalDate date = LocalDate.now();
//        LocalDateTime localDateTime= LocalDateTime.of(date,LocalTime.of(12,30)).plusMinutes(7);
        LocalDateTime localDateTime= LocalDateTime.now().plusMinutes(4);

        FacilityDateRequestDto requestDto = new FacilityDateRequestDto(facility, date);


        Facility facility1 = facilityRepository.findByName(requestDto.getFacility());
        LocalDateTime startDatetime = LocalDateTime.of(requestDto.getDate(), LocalTime.of(0, 0, 0));
        LocalDateTime endDatetime = LocalDateTime.of(requestDto.getDate(), LocalTime.of(23, 59, 59));
        List<Reservation> reservations = reservationRepository
                .findAllByFacilityAndStartTimeBetween(facility1,  startDatetime, endDatetime);

        ReservationComparator reservationComparator = new ReservationComparator();
        Collections.sort(reservations,reservationComparator);




        /*
        isBefore() : 인자보다 과거일 때 true가 리턴   a.isBefore(b)   a < b
        isAfter() : 인자보다 미래일 때 true가 리턴    a.isAfter(b)    a > b
        isEqual() : 인자와 같은 시간일 때 true가 리턴
        */


        LocalTime time= LocalTime.now();


        System.out.println(localDateTime);
        Iterator<Reservation> iterator = reservations.iterator();
        Reservation[] reservationsArr = new Reservation[2];
        reservationsArr[0]=new Reservation();
        reservationsArr[1]=new Reservation();
        boolean flag=false;
        while( iterator.hasNext()){
            Reservation r=  iterator.next();
            System.out.println(r.toString());
            if(r.getStartTime().isBefore(localDateTime) && localDateTime.isBefore(r.getEndTime()) &&r.getReservationStatus()!=ReservationStatus.CANCEL ) {
                reservationsArr[0]=r;
                flag=true;
                break;
            }
        }

        if (flag) {
            if(iterator.hasNext()){
                reservationsArr[1]=iterator.next();
            }
        }
        else{
            iterator=reservations.iterator();
            while(iterator.hasNext()){
                Reservation r= iterator.next();
                if(localDateTime.isBefore(r.getStartTime())){
                    reservationsArr[1]=r;
                    break;
                }
            }
        }

        System.out.println(reservationsArr[0]);
        System.out.println(reservationsArr[1]);



        Optional<Reservation> byId = reservationRepository.findById(1L);
//        reservations.get(0).getStartTime().get()
//        System.out.println(reservationsArr[0].getStartTime().getHour()+" "+String.format("%02d",reservationsArr[0].getStartTime().getMinute()));
//        System.out.println(reservationsArr[0].getEndTime().getHour()+" "+reservationsArr[0].getEndTime().getMinute());
        String startTime="";
        String endTime="";
        String username="";
        String name="";
        String status="";
        String startTime2="";
        String endTime2="";
        String username2="";
        String name2="";
        String status2="";

        if(reservationsArr[0].getStartTime()!=null) {
            startTime = reservationsArr[0].getStartTime().getHour() + ":" + String.format("%02d", reservationsArr[0].getStartTime().getMinute());
            endTime = reservationsArr[0].getEndTime().getHour() + ":" + String.format("%02d", reservationsArr[0].getEndTime().getMinute());
            startTime=startTime+"~"+endTime;
            username=reservationsArr[0].getMember().getUsername();
            name=reservationsArr[0].getReservationName();
            status="사용 중";
            reservationsArr[0].setReservationStatus(ReservationStatus.ING);


        }
        if(reservationsArr[1].getStartTime()!=null) {
            startTime2 = reservationsArr[1].getStartTime().getHour() + ":" + String.format("%02d", reservationsArr[1].getStartTime().getMinute());
            endTime2 = reservationsArr[1].getEndTime().getHour() + ":" + String.format("%02d", reservationsArr[1].getEndTime().getMinute());
            startTime2=startTime2+"~"+endTime2;

            username2 = reservationsArr[1].getMember().getUsername();
            name2=reservationsArr[1].getReservationName();
            status2="대기 중";
            reservationsArr[1].setReservationStatus(ReservationStatus.WAIT);

        }
//        String professor=reservations.

        /*     연구실 업데이트   */
        Lab lab = labRepository.findByLocation("센426");
        System.out.println(lab);
        Member member = lab.getMember();
        System.out.println(member.getUsername());

        String createfile = "src\\main\\resources\\esl\\import_20211111163004.csv";
        FileWriter fw = new FileWriter(createfile);
        fw.append("room_id,time,subject,prof,status,time2,subect2,prof2,status2\n" +
                "센B206,"+startTime+","+name+","+username+
                ","+status+","+startTime2+","+name2+","+username2+","+status2+"\n"+
                ""+lab.getLocation()+",,"+lab.getNotice()+","+lab.getMember().getUsername()+","+lab.getState()+",,,,");





        fw.flush();
        fw.close();

        String host="112.146.86.42";
        String user="cgESLUser";
        String pwd="cgESLPassword";
        File target =new File(createfile);

//        FtpClient ftp_ivr = new FtpClient(host, user, pwd, "");
//        boolean result = ftp_ivr.upload(target, "/Import");
//        System.out.println("FTP result : " + result);


        ftp = new FTPClient();
        ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
        int reply;
        ftp.connect(host,8484);//호스트 연결
        reply = ftp.getReplyCode();
        if (!FTPReply.isPositiveCompletion(reply)) {
            ftp.disconnect();
            throw new Exception("Exception in connecting to FTP Server");
        }
        ftp.login(user, pwd);//로그인
        ftp.setFileType(FTP.BINARY_FILE_TYPE);
        ftp.enterLocalPassiveMode();

        String localFileFullName="src\\main\\resources\\esl\\import_20211111163004.csv";
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

        System.out.println("===========당일 수업 목록 ============");

        for( Reservation rr: reservations) {
            System.out.println(rr.toString() + "ch");
            if(localDateTime.isAfter(rr.getEndTime()))
                rr.setReservationStatus(ReservationStatus.END);
        }
        System.out.println("===========ESL 표시 될 항목 ============");

        System.out.println(reservationsArr[0]);
        System.out.println(reservationsArr[1]);


    }

    @Scheduled(cron = "0 28/58 * * * *")
    @Transactional
    public void ESL_ALL() throws Exception {

        LocalDate date = LocalDate.now();
//        date = LocalDate.of(2021, 12, 17);

//        LocalDateTime localDateTime= LocalDateTime.of(date,LocalTime.of(12,30)).plusMinutes(7);
        LocalDateTime localDateTime= LocalDateTime.now().plusMinutes(4);



        LocalDateTime startDatetime = LocalDateTime.of(date, LocalTime.of(0, 0, 0));
        LocalDateTime endDatetime = LocalDateTime.of(date, LocalTime.of(23, 59, 59));
        List<Reservation> reservations = reservationRepository
                .findAllByStartTimeBetween(  startDatetime, endDatetime);

        ReservationComparator reservationComparator = new ReservationComparator();
        Collections.sort(reservations,reservationComparator);

        Iterator<Reservation> iterator = reservations.iterator();
        boolean flag=false;

        while( iterator.hasNext()){
            Reservation r=  iterator.next();
            if(r.getReservationStatus()==ReservationStatus.CANCEL)continue;
            if(r.getStartTime().isBefore(localDateTime) && localDateTime.isBefore(r.getEndTime())  ) {
                r.setReservationStatus(ReservationStatus.ING);

            }
            else if(localDateTime.isAfter(r.getEndTime()))
                r.setReservationStatus(ReservationStatus.END);
            else if(localDateTime.isBefore(r.getEndTime()))
                r.setReservationStatus(ReservationStatus.WAIT);

            System.out.println(r.toString());

        }


    }

    class ReservationComparator implements Comparator<Reservation>{
        @Override
        public int compare(Reservation r1, Reservation r2){
            if (r1.getStartTime().isBefore(r2.getStartTime()))
                return -1;
            else if (r2.getStartTime().isBefore(r1.getStartTime())){
                return 1;
            }
            else return 0;

        }
    }
}

//a.isBefore(b)   a < b
//        isAfter() : 인자보다 미래일 때 true가 리턴    a.isAfter(b)    a > b
