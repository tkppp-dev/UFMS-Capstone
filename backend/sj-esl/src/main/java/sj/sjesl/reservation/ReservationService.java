package sj.sjesl.reservation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sj.sjesl.entity.*;
import sj.sjesl.repository.BuildingRepository;
import sj.sjesl.repository.FacilityRepository;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.ReservationRepository;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final FacilityRepository facilityRepository;
    private final BuildingRepository buildingRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public List<String> getBuildingList() {
        return facilityRepository.findBuildingByCategory("강의실").stream()
                .map(String::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Building getBuildingDetails(String buildingName) {
        return buildingRepository.findByName(buildingName);
    }

    @Transactional
    public List<String> getFloorList(String building) {
        return facilityRepository.findFloorByBuildingAndCategory(building, "강의실");
    }

    @Transactional
    public List<FacilityResponseDto> getFloor(BuildingFloorRequestDto requestDto) {
        return facilityRepository.findByBuildingAndFloorAndCategory(requestDto.getBuilding(), requestDto.getFloor(), "강의실")
                .stream()
                .map(FacilityResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ReservationListResponseDto> getReservationList(FacilityDateRequestDto requestDto) {
        Facility facility = facilityRepository.findByName(requestDto.getFacility());
        LocalDateTime startDatetime = LocalDateTime.of(requestDto.getDate(), LocalTime.of(0, 0, 0));
        LocalDateTime endDatetime = LocalDateTime.of(requestDto.getDate(), LocalTime.of(23, 59, 59));

        List<Reservation> reservations = reservationRepository
                .findAllByFacilityAndReservationStatusIsNotAndStartTimeBetween(facility, ReservationStatus.CANCEL, startDatetime, endDatetime);

        Map<LocalTime, Boolean> timetable = new TreeMap<>();
        LocalTime time = LocalTime.of(9, 00);

        for (int i = 0; i < 8; i++) {
            timetable.put(time, true);
            time = time.plusMinutes(90);
        }

        for (Reservation reservation : reservations) {
            LocalTime startTime = reservation.getStartTime().toLocalTime();
            LocalTime endTime = reservation.getEndTime().toLocalTime();
            time = startTime;

            while (time.isBefore(endTime)) {
                timetable.put(time, false);
                time = time.plusMinutes(90);
            }
        }

        List<ReservationListResponseDto> list = new ArrayList<>();

        for (LocalTime t : timetable.keySet()) {
            ReservationListResponseDto dto = new ReservationListResponseDto(t, timetable.get(t));
            list.add(dto);
        }

        return list;
    }

    @Transactional
    public Long save(ReservationRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getMemberId()).get();
        Facility facility = facilityRepository.findByName(requestDto.getFacility());
        LocalDateTime startTime = requestDto.getStartTime();
        LocalDateTime endTime = requestDto.getEndTime();
        String reservationName = requestDto.getReservationName();
        String notice = requestDto.getNotice();
        Reservation reservation = Reservation.builder()
                .member(member)
                .facility(facility)
                .startTime(startTime)
                .endTime(endTime)
                .reservationName(reservationName)
                .notice(notice)
                .reservationStatus(ReservationStatus.BEFORE)
                .build();

        return reservationRepository.save(reservation).getId();
    }

    @Transactional
    public void cancel(Long id) {
        Reservation reservation = reservationRepository.findById(id).get();
        reservation.setReservationStatus(ReservationStatus.CANCEL);
    }

    @Transactional
    public List<ReservationResponseDto> getHalfYear(String facilityName) {
        Facility facility = facilityRepository.findByName(facilityName);
        LocalDateTime today = LocalDateTime.of(LocalDate.now(), LocalTime.of(0, 0, 0));
        LocalDateTime end = LocalDateTime.of(LocalDate.now().plusMonths(6), LocalTime.of(23, 59, 59));

        return reservationRepository
                .findHalfYear(facility, today, end)
                .stream()
                .map(ReservationResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReservationResponseDto update(Long id,ReservationRequestDto.update update){
        Optional<Reservation> byId = reservationRepository.findById(id);
        byId.get().update(update);
        return new ReservationResponseDto(byId.get());
    }
}