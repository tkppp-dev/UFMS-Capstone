package sj.sjesl.rental;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class RentalDaysRequestDto {

    private String facilityName;
    private LocalDate startDate;
    private int rentalDays;

    @Data
    public static class rentalId {
        private Long rentalId;
    }
}
