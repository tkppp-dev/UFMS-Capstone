package sj.sjesl.rental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Facility;

import java.time.LocalDate;
import java.util.List;

public interface RentalRepository extends JpaRepository<Rental, Long> {

    @Query("select count(r) from Rental r where r.id in (select r.id from Rental r where r.facility = ?1 and ?2 <= r.endDate and ?3 >= r.startDate)")
    int findAvailability(Facility facility, LocalDate startDate, LocalDate endDate);

    @Query("select p from Rental p where p.facility=?1 and p.startDate>=?2 and p.endDate<?3 order by p.startDate")
    List<Rental> findByFacilityAndStartDateBetween(Facility facility, LocalDate today, LocalDate end);
}
