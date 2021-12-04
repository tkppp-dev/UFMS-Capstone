package sj.sjesl.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.RentalStatus;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    @Query("select count(r) from Rental r " +
            "where r.facility = ?1 and ?2 <= r.endDate and ?3 >= r.startDate and r.rentalStatus <> 'CANCEL'")
    int findAvailability(Facility facility, LocalDate startDate, LocalDate endDate);

    @Query("select p from Rental p " +
            "where p.facility=?1 and p.rentalStatus <> 'CANCEL' and p.startDate>=?2 and p.endDate<?3 " +
            "order by p.startDate")
    List<Rental> findHalfYear(Facility facility, LocalDate today, LocalDate end);

    List<Rental> findByMember(Member member);
}
