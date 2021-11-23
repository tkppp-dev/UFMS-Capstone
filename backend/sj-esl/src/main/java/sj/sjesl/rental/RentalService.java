package sj.sjesl.rental;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.repository.BuildingRepository;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.MemberRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class RentalService {

    private final RentalRepository rentalRepository;
    private final FacilityRepository facilityRepository;
    private final BuildingRepository buildingRepository;
    private final MemberRepository memberRepository;


    @Transactional
    public List<String> getRentalFacilityList() {
        return facilityRepository.findNameByCategory("강의실 외 시설물").stream()
                .map(String::new)
                .collect(Collectors.toList());
    }


    @Transactional
    public RentalFacilityResponseDto getDetails(String facilityName) {
        Facility facility = facilityRepository.findByName(facilityName);

        return new RentalFacilityResponseDto(facility);
    }


    @Transactional
    public String getRentalAvailability(RentalDaysRequestDto requestDto) {

        Facility facility = facilityRepository.findByName(requestDto.getFacilityName());
        int rentalDays = requestDto.getRentalDays();
        LocalDate startDate = requestDto.getStartDate();
        LocalDate endDate = startDate.plusDays(rentalDays - 1);

        int count = rentalRepository.findAvailability(facility, startDate, endDate);

        if (count == 0) {
            return "대관 신청이 가능합니다.";
        } else {
            return "대관 신청이 불가합니다";
        }
    }


   @Transactional
    public String save(RentalRequestDto requestDto) {

        Facility facility = facilityRepository.findByName(requestDto.getFacility());
        int rentalDays = requestDto.getRentalDays();
        LocalDate startDate = requestDto.getStartDate();
        LocalDate endDate = startDate.plusDays(rentalDays - 1);

        int count = rentalRepository.findAvailability(facility, startDate, endDate);

        if (count == 0) {

            Optional<Member> member = memberRepository.findById(requestDto.getMemberId());

            Rental rental = Rental.builder()
                    .member(member.get())
                    .facility(facility)
                    .startDate(startDate)
                    .endDate(endDate)
                    .rentalDays(rentalDays)
                    .hirer(requestDto.getHirer())
                    .groupName(requestDto.getGroup())
                    .purpose(requestDto.getPurpose())
                    .additionalMobile(requestDto.getAdditionalMobile())
                    .additionalEmail(requestDto.getAdditionalEmail())
                    .build();

            rentalRepository.save(rental);

            return "대관 신청 완료";
        } else {
            return "대관 신청 실패";
        }
    }

    //내 대관 리스트 조회
    //대관 상세 조회
    //대관 취소
}
