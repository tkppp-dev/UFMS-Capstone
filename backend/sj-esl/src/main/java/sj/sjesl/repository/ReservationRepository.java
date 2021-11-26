package sj.sjesl.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.ReservationStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
List<Reservation> findAllByFacilityAndReservationStatusAndStartTimeBetween(Facility facility,
            ReservationStatus reservationStatus, LocalDateTime startDatetime, LocalDateTime endDatetime);

List<Reservation> findByMember(Member member);

List<Reservation> findByMemberAndStartTimeBetween(Member member, LocalDateTime startTime, LocalDateTime endTime);

@Query(value = "select p from Reservation  p where p.member = ?1 and p.startTime <= ?2 and p.endTime >= ?2")
Reservation findNow(Member member, LocalDateTime now);

Reservation findTopByMemberAndStartTimeAfterOrderByStartTime(Member member, LocalDateTime now);
