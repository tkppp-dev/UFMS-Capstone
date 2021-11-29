package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.ReservationStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findAllByFacilityAndReservationStatusAndStartTimeBetween(Facility facility,
            ReservationStatus reservationStatus, LocalDateTime startDatetime, LocalDateTime endDatetime);

    List<Reservation> findByMember(Member member);

    List<Reservation> findByMemberAndStartTimeBetween(Member member, LocalDateTime startTime, LocalDateTime endTime);

    @Query(value = "select p from Reservation  p where p.member = ?1 and p.startTime <= ?2 and p.endTime >= ?2")
    Reservation findNow(Member member, LocalDateTime now);

    Reservation findTopByMemberAndStartTimeBetweenOrderByStartTime(Member member, LocalDateTime now, LocalDateTime endDateTime);

    @Query("select p from Reservation p where p.facility=?1 and p.reservationStatus=?2 and p.startTime>=?3 and p.startTime<?4 order by p.startTime")
    List<Reservation> findByFacilityAndReservationStatusAndStartDateBetween(Facility facility, ReservationStatus reservationStatus, LocalDateTime today, LocalDateTime end);
}
