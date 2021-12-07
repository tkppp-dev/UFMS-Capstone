package sj.sjesl.reservation;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.dto.lab.LabRequestDto;
import sj.sjesl.entity.Building;
import sj.sjesl.payload.Response;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.LabRepository;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.ReservationRepository;
import sj.sjesl.util.FTPUploader2;

import java.util.List;

@Api(tags = "예약 API")
@RequiredArgsConstructor
@RestController
public class ReservationApiController {

    private final ReservationService reservationService;
    private final LabRepository labRepository;
    private final MemberRepository memberRepository;
    private final Response response;
    private final ReservationRepository reservationRepository ;
    private final FacilityRepository facilityRepository;
    @ApiOperation(value = "예약 가능한 건물 리스트 조회")
    @GetMapping("/reservation/building")     //예약가능한 강의실 건물 이름 리스트 리턴
    public List<String> getBuildingList() {
        return reservationService.getBuildingList();
    }

    @ApiOperation(value = "건물 정보 리턴")
    @GetMapping("/reservation/building/{building}")
    public Building getBuildingDetails(@PathVariable String building) {   //이미지 리턴 타입 바꿔야함
        return reservationService.getBuildingDetails(building);
    }

    @ApiOperation(value = "건물의 층 리스트 리턴")
    @GetMapping("/reservation/building/floor/{building}")
    public List<String> getFloorList(@PathVariable String building) {
        return reservationService.getFloorList(building);
    }

    @ApiOperation(value = "건물 - 층 의 강의실 리스트 리턴")
    @PostMapping("/reservation/building/floor")
    public List<FacilityResponseDto> getFloor(@RequestBody BuildingFloorRequestDto requestDto){
        return reservationService.getFloor(requestDto);
    }

    @ApiOperation(value = "강의실 - 날짜 에 예약 가능한 시간 리스트 리턴")
    @PostMapping("/reservation/building/date")
    public List<ReservationListResponseDto> getReservationList(@RequestBody FacilityDateRequestDto requestDto) {
        return reservationService.getReservationList(requestDto);
    }

    @ApiOperation(value = "예약 등록")
    @PostMapping("/reservation")
    public Long save(@RequestBody ReservationRequestDto requestDto) throws Exception {
        FTPUploader2 ftpUploader2 = new FTPUploader2(reservationRepository,  facilityRepository,  labRepository,  memberRepository);
        ftpUploader2.ESL_FTP();
        return reservationService.save(requestDto);
    }

    @ApiOperation(value = "예약 삭제")
    @DeleteMapping("/reservation/{id}")
    public Long cancel(@PathVariable Long id) throws Exception {
        reservationService.cancel(id);
        FTPUploader2 ftpUploader2 = new FTPUploader2(reservationRepository,  facilityRepository,  labRepository,  memberRepository);
        ftpUploader2.ESL_FTP();
        return id;
    }

    @ApiOperation(value = "예약 현황 조회 (6개월)")
    @GetMapping("/reservation/check/{facilityname}")
    public List<ReservationResponseDto> getHalfYear(@PathVariable String facilityname) {
        return reservationService.getHalfYear(facilityname);
    }




    @PutMapping("/reservation/{id}")    //상태 변경
    @ApiOperation(value = "예약 변경")
    public ReservationResponseDto update(@PathVariable Long id, @RequestBody ReservationRequestDto.update update) throws Exception {
        FTPUploader2 ftpUploader2 = new FTPUploader2(reservationRepository,  facilityRepository,  labRepository,  memberRepository);
        ftpUploader2.ESL_FTP();
        return reservationService.update(id, update);

    }
}
