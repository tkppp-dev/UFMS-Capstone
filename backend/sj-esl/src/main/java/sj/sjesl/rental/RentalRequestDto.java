package sj.sjesl.rental;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class RentalRequestDto {

    private Long memberId;
    private String facility;
    private LocalDate startDate;
    private int rentalDays;
    private String purpose;
    private String hirer;
    private String group;
    private String additionalMobile;
    private String additionalEmail;

}
