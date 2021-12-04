package sj.sjesl.rental;

import lombok.Builder;
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
    private String eventName;
    private String group;
    private String additionalMobile;
    private String additionalEmail;

    @Builder
    public RentalRequestDto(Long memberId, String facility,LocalDate startDate, int rentalDays, String purpose,
                            String eventName, String group, String additionalMobile, String additionalEmail) {
        this.memberId = memberId;
        this.facility = facility;
        this.startDate = startDate;
        this.rentalDays = rentalDays;
        this.purpose = purpose;
        this.eventName = eventName;
        this.group = group;
        this.additionalMobile = additionalMobile;
        this.additionalEmail = additionalEmail;
    }
}
