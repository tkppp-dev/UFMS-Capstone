package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.ReservationInquiry;

import java.util.List;

public interface ReservationInquiryRepository extends JpaRepository<ReservationInquiry,Long> {
    @Query("SELECT p FROM ReservationInquiry p ORDER BY p.id DESC")
    List<ReservationInquiry> findAllDesc();

    @Query("SELECT p FROM ReservationInquiry p where p.member = ?1 ORDER BY p.id DESC")
    List<ReservationInquiry> findByMemberDesc(Member member);
}