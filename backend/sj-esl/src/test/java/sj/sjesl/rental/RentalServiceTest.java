package sj.sjesl.rental;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.MemberRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RentalServiceTest {

    @Autowired
    private RentalRepository rentalRepository;
    @Autowired
    private RentalService rentalService;
    @Autowired
    private FacilityRepository facilityRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    void save() {
        Long id = Long.valueOf(14);
        LocalDate date = LocalDate.of(2021,12,11);
        RentalRequestDto requestDto = new RentalRequestDto(id,"광1503",date,1,"ㅂㄱ","ㅋㅌㄹㅊ","ㅁㄴㅇ","ㅁㄴㅇ","ㅁㄴㄹ");

        Facility facility = facilityRepository.findByName(requestDto.getFacility());
        int rentalDays = requestDto.getRentalDays();
        LocalDate startDate = requestDto.getStartDate();
        LocalDate endDate = startDate.plusDays(rentalDays - 1);

        int count = rentalRepository.findAvailability(facility, startDate, endDate);

        if (count == 0) {

            Member member = memberRepository.findByMemberId(requestDto.getMemberId());

            Rental rental = Rental.builder()
                    .member(member)
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

            System.out.println("대관 신청 완료");
        } else {
            System.out.println("대관 신청 실패");
        }
    }

    @Test
    void getHalf(){
        List<RentalResponseDto> list = rentalService.getHalfYearList("광1503");

        for (RentalResponseDto a : list) {
            System.out.println(a.getId());
        }
    }
}