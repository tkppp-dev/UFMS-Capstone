package sj.sjesl.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sj.sjesl.dto.ScheduleAddRequestDto;
import sj.sjesl.dto.ScheduleDateRequestDto;
import sj.sjesl.dto.ScheduleResponseDto;
import sj.sjesl.dto.SubjectResponseDto;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.Schedule;
import sj.sjesl.entity.Subject;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.ReservationRepository;
import sj.sjesl.repository.ScheduleRepository;
import sj.sjesl.repository.SubjectRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ReservationRepository reservationRepository;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;
    private final SubjectRepository subjectRepository;

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
        LocalDateTime endDateTime = LocalDateTime.of(now.toLocalDate(), LocalTime.of(23, 59, 59));
        Reservation reservation = reservationRepository
                .findTopByMemberAndStartTimeBetweenOrderByStartTime(member, now, endDateTime);

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
                ScheduleResponseDto responseDto = new ScheduleResponseDto(reservation);
                dayList.add(responseDto);
            }
            weekList.add(dayList);
            date = date.plusDays(1);
        }
        return weekList;
    }


    @Transactional
    public ScheduleAddRequestDto add(ScheduleAddRequestDto scheduleAddRequestDto) {
//        if(scheduleAddRequestDto.getSubjectId())
        Member member = memberRepository.findByMemberId(scheduleAddRequestDto.getMemberId());
        Schedule byMemberAndSubject_id = scheduleRepository.findByMemberAndSubject_id(member, scheduleAddRequestDto.getSubjectId());

        if( byMemberAndSubject_id!= null) return new ScheduleAddRequestDto(300L);

//        Subject subject = subjectRepository.findById(scheduleAddRequestDto.getSubjectId()).get();

        List<Reservation> CurSubject = reservationRepository.findBySubjectId(scheduleAddRequestDto.getSubjectId());

        List<Long> subjects = getSubject(scheduleAddRequestDto.getMemberId()).stream().map(SubjectResponseDto::getSubjectId).collect(Collectors.toList());

        for( Reservation r :  CurSubject){

            List<Reservation> reservations = reservationRepository.subjectFindBetween( r.getStartTime(), r.getEndTime(),subjects);
            if(reservations.size()!=0) return new ScheduleAddRequestDto(400L);

        }



        scheduleRepository.save(Schedule.builder()
                .member(memberRepository.findById(scheduleAddRequestDto.getMemberId()).get())
                .subject_id(scheduleAddRequestDto.getSubjectId())
                .build());
        return scheduleAddRequestDto;

    }

    @Transactional
    public  List<SubjectResponseDto> getSubject(Long id) {
        Optional<Member> member = memberRepository.findById(id);

        List<Schedule> allByMemberId = scheduleRepository.findAllByMember(member.get());
        List<Long> subjectIdList = allByMemberId.stream()
                .map(Schedule::getSubject_id)
                .collect(Collectors.toList());

        List<Subject> byId = subjectRepository.findSubjectList(subjectIdList);
        List<SubjectResponseDto> subjectResponseDtos = new ArrayList<>();
        for( Subject s: byId){

            Optional<Schedule> schedule = scheduleRepository.findBySubject_id(s.getId(), member.get());


            subjectResponseDtos.add(new SubjectResponseDto(s,schedule.get().getId()));
        }
        return subjectResponseDtos;

    }


}
