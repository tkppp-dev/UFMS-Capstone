package sj.sjesl.rental;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class RentalDaysRequestDto {

    private String facilityName;
    private LocalDate startDate;
    private int rentalDays;

}
