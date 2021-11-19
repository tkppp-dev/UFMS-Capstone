package sj.sjesl.reservation;

import lombok.Getter;
import sj.sjesl.entity.Reservation;

import java.time.LocalDateTime;

@Getter
public class ReservationListResponseDto {

    private String cls;
    private Boolean tf;

    public ReservationListResponseDto(String cls, Boolean tf) {
        this.cls = cls;
        this.tf = tf;
    }
}
