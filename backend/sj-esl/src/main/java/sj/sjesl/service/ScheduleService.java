package sj.sjesl.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sj.sjesl.dto.ScheduleDateRequestDto;
import sj.sjesl.dto.ScheduleResponseDto;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Reservation;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.ReservationRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public ScheduleResponseDto getNow(Long id) {
        Member member = memberRepository.findByMemberId(id);
        LocalDateTime now = LocalDateTime.now();
        Reservation reservation = reservationRepository.findNow(member, now);

        if (reservation == null)
            return null;
        else
            return new ScheduleResponseDto(reservation);

    }

    @Transactional
    public ScheduleResponseDto getNext(Long id) {
        Member member = memberRepository.findByMemberId(id);
        LocalDateTime now = LocalDateTime.now();
        Reservation reservation = reservationRepository
                .findTopByMemberAndStartTimeAfterOrderByStartTime(member, now);

        if (reservation == null)
            return null;
        else
            return new ScheduleResponseDto(reservation);
    }

    @Transactional
    public List<List<ScheduleResponseDto>> getWeek(ScheduleDateRequestDto requestDto) {
        Member member = memberRepository.findByMemberId(requestDto.getMemberId());
        LocalDate startDate = requestDto.getStartDate();
        LocalDate endDate = requestDto.getEndDate();


        LocalDate date = startDate;
        List<List<ScheduleResponseDto>> weekList = new ArrayList<>();

        while (date.isBefore(endDate.plusDays(1))) {
            LocalDateTime startDatetime = LocalDateTime
                    .of(date, LocalTime.of(0, 0, 0));
            LocalDateTime endDatetime = LocalDateTime
                    .of(date, LocalTime.of(23, 59, 59));


            List<Reservation> reservations = reservationRepository
                    .findByMemberAndStartTimeBetween(member, startDatetime, endDatetime);


            List<ScheduleResponseDto> dayList = new ArrayList<>();

            for (Reservation reservation : reservations) {
                if (reservation == null) {
                    continue;
                } else {
                    ScheduleResponseDto responseDto = new ScheduleResponseDto(reservation);
                    dayList.add(responseDto);
                }
            }
            weekList.add(dayList);
            date = date.plusDays(1);
        }
        return weekList;
    }
}
