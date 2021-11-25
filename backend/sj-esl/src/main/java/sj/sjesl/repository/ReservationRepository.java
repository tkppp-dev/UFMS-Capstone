package sj.sjesl.repository;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.ReservationStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findAllByFacilityAndReservationStatusAndStartTimeBetween(Facility facility,
            ReservationStatus reservationStatus, LocalDateTime startDatetime, LocalDateTime endDatetime);


    @Query(value = "select p from Reservation  p where p.member = ?1 and p.startTime <= ?2 and p.endTime >= ?2")
    Optional<Reservation> findNow(Member member, LocalDateTime now);

//    @Query(value = "select p from Reservation  p where p.member = ?1 and p.startTime > ?2 order by p.startTime limit 1")
//    Reservation findNext(Member member, LocalDateTime now);
//    Reservation findByMember(Member member);
}
