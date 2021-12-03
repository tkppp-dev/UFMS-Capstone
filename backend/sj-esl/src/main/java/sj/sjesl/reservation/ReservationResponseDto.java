package sj.sjesl.reservation;

import lombok.Getter;
import sj.sjesl.entity.Reservation;

import java.time.LocalDateTime;

@Getter
public class ReservationResponseDto {
    private Long id;
    private String memberName;
    private String facility;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String reservationName;
    private String notice;

    public ReservationResponseDto(Reservation reservation) {
        this.id = reservation.getId();
        if (reservation.getMember() == null) {
            this.memberName = "";
        } else {
            this.memberName = reservation.getMember().getUsername();
        }
        if(reservation.getFacility()!=null)
            this.facility = reservation.getFacility().getName();

        this.startTime = reservation.getStartTime();
        this.endTime = reservation.getEndTime();
        this.reservationName = reservation.getReservationName();
        this.notice = reservation.getNotice();
    }
}
