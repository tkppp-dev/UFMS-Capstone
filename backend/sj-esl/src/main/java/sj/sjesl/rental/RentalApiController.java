package sj.sjesl.rental;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Time;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.entity.Notification;
import sj.sjesl.entity.RentalStatus;
import sj.sjesl.repository.NotificationRepository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Api(tags = "대관 API")
@RequiredArgsConstructor
@RestController
public class RentalApiController {

    private final RentalService rentalService;
    private final RentalRepository rentalRepository;
    private final NotificationRepository notificationRepository;


    @ApiOperation(value = "대관 가능한 시설물 조회")
    @GetMapping("/rental")
    public List<String> getRentalFacilityList() {
        return rentalService.getRentalFacilityList();
    }

    @ApiOperation(value = "해당 시설 정보 리턴")
    @GetMapping("/rental/{facilityName}")
    public RentalFacilityResponseDto getDetails(@PathVariable String facilityName) {
        return rentalService.getDetails(facilityName);
    }

    @ApiOperation(value = "시작일부터 대관 일수 만큼 대관 가능 여부 리턴")
    @PostMapping("/rental/availability")
    public String getRentalAvailability(@RequestBody RentalDaysRequestDto requestDto) {
        return rentalService.getRentalAvailability(requestDto);
    }

    @ApiOperation(value = "대관 신청 성공 여부 리턴")
    @PostMapping("/rental/r")
    public String save(@RequestBody RentalRequestDto requestDto) {
        return rentalService.save(requestDto);
    }

    @ApiOperation(value = "대관 현황 조회 (6개월)")
    @GetMapping("/rental/check/{facilityName}")
    public List<RentalResponseDto> getHalfYearList(@PathVariable String facilityName) {
        return rentalService.getHalfYearList(facilityName);
    }

    @ApiOperation(value = "대관 예약 승인")
    @GetMapping("/rental/complete/{id}")
    @Transactional
    public RentalResponseDto RentalComplete(@PathVariable Long id) {
        Optional<Rental> byId = rentalRepository.findById(id);
        byId.get().setRentalStatus(RentalStatus.COMPLETE);
        notificationRepository.save(Notification.builder()
                .member(byId.get().getMember())
                .reservationName(byId.get().getPurpose())
                .reservationUserName(byId.get().getHirer())
                .reservationTime(LocalDateTime.of(byId.get().getStartDate(), LocalTime.now()))
                .build());

        return new RentalResponseDto(byId.get());
    }


    @ApiOperation(value = "대관 조회(개인)")
    @GetMapping("/rental/member/{id}")
    @Transactional
    public List<RentalResponseDto> RentalMember(@PathVariable Long id) {
        return rentalService.getMemberRental(id);
    }

    @ApiOperation(value = "대관 취소(삭제)")
    @PostMapping("/rental/delete")
    @Transactional
    public String delete(@RequestBody RentalDaysRequestDto.rentalId deleteId) {
        rentalRepository.deleteById(deleteId.getRentalId());
        return "삭제 완료";
    }


//    COMPLETE, WAIT, CANCEL
    //내 대관 리스트 조회
    //대관 상세 조회
    //대관 취소
}
