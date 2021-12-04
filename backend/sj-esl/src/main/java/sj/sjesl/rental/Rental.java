package sj.sjesl.rental;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sj.sjesl.entity.BaseEntity;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.RentalStatus;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Rental extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rental_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "facility_id")
    private Facility facility;

    private LocalDate startDate;
    private LocalDate endDate;
    private int rentalDays;
    private String eventName;
    private String groupName;
    private String purpose;
    private String additionalMobile;
    private String additionalEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RentalStatus rentalStatus;


    @Builder
    public Rental(Member member, Facility facility, LocalDate startDate, LocalDate endDate, int rentalDays, String eventName,
                  String groupName, String purpose, String additionalMobile, String additionalEmail, RentalStatus rentalStatus) {
        this.member = member;
        this.facility = facility;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rentalDays = rentalDays;
        this.eventName = eventName;
        this.groupName = groupName;
        this.purpose = purpose;
        this.additionalMobile = additionalMobile;
        this.additionalEmail = additionalEmail;
        this.rentalStatus = rentalStatus;
    }

}