package sj.sjesl.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.entity.Facility;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReservationApiController {

    private ReservationService reservationService;

    @GetMapping("/reservation/building")     //예약가능한 강의실 건물 이름 리스트 리턴
    public List<String> getBuildingList() {
        return reservationService.getBuildingList();
    }

    @PostMapping("/reservation/building/{building}")
    public String getBuildingImg(@PathVariable String building) {   //이미지 리턴 타입 바꿔야함
        return reservationService.getBuildingImg(building);
    }

//        POST – 파라미터 { 건물 이름, 층 } : 해당 건물의 층의 강의실 정보 리스트 반환
//        강의실 정보 : 강의실 명, 최대 인원 수
    @PostMapping("/reservation/building/a")
    public List<FacilityResponseDto> getFloorList(@RequestBody BuildingFloorRequestDto requestDto){
        return reservationService.getFloorList(requestDto);
    }


//        POST – 파라미터 { 예약하려는 시설 이름, 년, 월, 일 } : 해당 날짜의 예약 가능 시간 리스트 반환
//        예) [1교시 : false, 2교시 : true, ….]
    @PostMapping("/reservation/building/b")
    public List<ReservationListResponseDto> getReservationList(@RequestBody FacilityDateRequestDto requestDto) {
        return reservationService.getReservationList(requestDto);
    }


//        POST – 파라미터 { 예약하려는 시설 이름, 예약하려는 시간 리스트, 예약 이름, 대상, 예약 목적 } : 강의실 예약 수행, 예약하려는 시간 리스트는 연속된 교시임
    @PostMapping("/reservation/building/c")
    public Long save(@RequestBody ReservationRequestDto requestDto){
        return reservationService.save(requestDto);
    }
}
