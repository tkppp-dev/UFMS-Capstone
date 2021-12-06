package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.*;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findAllByFacilityAndReservationStatusAndStartTimeBetween(Facility facility,
                                                             ReservationStatus reservationStatus, LocalDateTime startDatetime, LocalDateTime endDatetime);
    List<Reservation> findAllByFacilityAndStartTimeBetween(Facility facility, LocalDateTime startDatetime, LocalDateTime endDatetime);

    List<Reservation> findAllByStartTimeBetween(LocalDateTime startDatetime, LocalDateTime endDatetime);

    List<Reservation> findAllByReservationStatusAndStartTimeBetween(ReservationStatus reservationStatus, LocalDateTime startDatetime, LocalDateTime endDatetime);
    List<Reservation> findByMember(Member member);

    List<Reservation> findByMemberAndStartTimeBetween(Member member, LocalDateTime startTime, LocalDateTime endTime);

    @Query("select r from Reservation r where r.subjectId in (?1) and  ?2 <= r.startTime and r.startTime <= ?3  order by r.startTime")
    List<Reservation> findBySubjectIdAndStartTimeBetween(List<Long> subjectId, LocalDateTime startTime, LocalDateTime endTime);

    //다음스케줄
    @Query("select r from Reservation r where (r.subjectId  in (?1) or r.member = ?4) and  ?2 < r.startTime  and r.startTime <= ?3  and r.reservationStatus <> 'CANCEL'  order by r.startTime")
    List<Reservation> findNextSchedule(List<Long> subjectId, LocalDateTime startTime, LocalDateTime endTime,Member member);


    @Query(value = "select p from Reservation  p where p.member = ?1 and p.startTime <= ?2 and p.endTime >= ?2 and p.reservationStatus <> 'CANCEL'")
    Reservation findNow(Member member, LocalDateTime now);

    //현재스케줄 학생
    @Query(value = "select p from Reservation  p where (p.member = ?1 or p.subjectId in (?3) )and p.startTime <= ?2 and p.endTime >= ?2 and p.reservationStatus <> 'CANCEL'")
    Reservation findNowStudent(Member member, LocalDateTime now,List<Long> ids);

    Reservation findTopByMemberAndReservationStatusIsNotAndStartTimeBetweenOrderByStartTime(Member member, ReservationStatus reservationStatus, LocalDateTime now, LocalDateTime endDateTime);



    @Query("select p from Reservation p where p.facility=?1 and p.reservationStatus=?2 and p.startTime>=?3 and p.startTime<?4 order by p.startTime")
    List<Reservation> findByFacilityAndReservationStatusAndStartDateBetween(Facility facility, ReservationStatus reservationStatus, LocalDateTime today, LocalDateTime end);

    @Query("select r from Reservation r where ( r.subjectId in (?3) )and (((?1 < r.startTime and r.startTime <?2) or (?1 < r.endTime and r.endTime <?2) " +
            "or (r.startTime < ?1  and ?1 <r.endTime)or (r.startTime < ?2  and ?2 <r.endTime))or (?1 = r.startTime and ?2 = r.endTime)) ")
    List<Reservation> subjectFindBetween( LocalDateTime cur_start, LocalDateTime cur_end,List<Long> subject );

    List<Reservation> findBySubjectId(Long id);

    @Query(value = "SELECT s FROM Subject s WHERE s.id IN (?1)")
    List<Subject> findSubjectList(List<Long> ids);

    List<Reservation> findAllByFacilityAndReservationStatusIsNotAndStartTimeBetween(Facility facility, ReservationStatus reservationStatus, LocalDateTime startDatetime, LocalDateTime endDatetime);

    @Query("select p from Reservation p where p.facility=?1 and p.reservationStatus<>'CANCEL' and p.startTime>=?2 and p.startTime<?3 order by p.startTime")
    List<Reservation> findHalfYear(Facility facility, LocalDateTime today, LocalDateTime end);

    List<Reservation> findByStartTimeAndEndTimeAndAndReservationStatusIsNot(LocalDateTime startTime, LocalDateTime endTime, ReservationStatus reservationStatus);
}