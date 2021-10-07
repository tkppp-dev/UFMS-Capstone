package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sj.sjesl.entity.ReservationInquiry;

public interface ReservationInquiryRepository extends JpaRepository<ReservationInquiry,Long> {
}
