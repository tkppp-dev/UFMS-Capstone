package sj.sjesl.rental;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "대관 API")
@RequiredArgsConstructor
@RestController
public class RentalApiController {

    private final RentalService rentalService;

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

    //내 대관 리스트 조회
    //대관 상세 조회
    //대관 취소
}
