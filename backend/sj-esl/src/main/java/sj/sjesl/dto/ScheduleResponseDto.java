package sj.sjesl.dto;

import lombok.Getter;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.ReservationStatus;

import java.time.LocalDate;

@Getter
public class ScheduleResponseDto {
    private Long reservationId;
    private String reservationName;
    private LocalDate date;
    private String time;
    private String facility;
    private ReservationStatus reservationStatus;
    private Long memberId;
    public ScheduleResponseDto(Reservation reservation) {
        this.reservationId = reservation.getId();
        this.reservationName = reservation.getReservationName();
        this.date = reservation.getStartTime().toLocalDate();
        this.time = reservation.getStartTime().toLocalTime().toString()
                +"~"
                +reservation.getEndTime().toLocalTime().toString();
        if(reservation.getFacility() == null)
            this.facility="";
        else {
            this.facility = reservation.getFacility().getName();
        }
        this.reservationStatus = reservation.getReservationStatus();
        if(reservation.getMember()!=null)
            this.memberId=reservation.getMember().getId();
    }
}
