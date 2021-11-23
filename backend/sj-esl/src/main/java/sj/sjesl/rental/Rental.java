package sj.sjesl.rental;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sj.sjesl.entity.BaseEntity;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;

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
    private String hirer;
    private String group;
    private String purpose;
    private String additionalMobile;
    private String additionalEmail;
//    private String rentalStatus;



    @Builder
    public Rental(Member member, Facility facility, LocalDate startDate, LocalDate endDate, int rentalDays,
                  String hirer, String group, String purpose, String additionalMobile, String additionalEmail) {
        this.member = member;
        this.facility = facility;
        this.startDate = startDate;
        this.endDate = endDate;
        this.rentalDays = rentalDays;
        this.hirer = hirer;
        this.group = group;
        this.purpose = purpose;
        this.additionalMobile = additionalMobile;
        this.additionalEmail = additionalEmail;
    }

}
