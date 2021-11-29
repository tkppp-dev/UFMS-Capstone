package sj.sjesl.rental;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RentalResponseDto {
    private Long id;
    private String memberName;
    private String facility;
    private LocalDate startDate;
    private LocalDate endDate;
    private int rentalDays;
    private String hirer;
    private String groupName;
    private String purpose;
    private String additionalMobile;
    private String additionalEmail;


    public RentalResponseDto(Rental rental) {
        this.id= rental.getId();
        this.memberName = rental.getMember().getUsername();
        this.facility = rental.getFacility().getName();
        this.startDate = rental.getStartDate();
        this.endDate = rental.getEndDate();
        this.rentalDays = rental.getRentalDays();
        this.hirer = rental.getHirer();
        this.groupName = rental.getGroupName();
        this.purpose = rental.getPurpose();
        this.additionalMobile = rental.getAdditionalMobile();
        this.additionalEmail = rental.getAdditionalEmail();
    }
}
