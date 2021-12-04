package sj.sjesl.dto;

import lombok.Data;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Notification;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

public class NotificationDto {
    private Long notificationId;

    @Data
    public static class Response {
        private Long id;
        private Long memberId;
        private LocalDateTime reservationTime;
        private String reservationUserName;
        private String reservationName;
        private String noticeDetails;
        //reservation_update,cancel  , inquiry, rental
        private String type;

        public Response(Notification notification) {
            this.id = notification.getId();
            this.memberId = notification.getMember().getMemberId();
            this.reservationTime = notification.getReservationTime();
            this.reservationUserName = notification.getReservationUserName();
            this.reservationName = notification.getReservationName();
            this.noticeDetails = notification.getNoticeDetails();
            this.type = notification.getType();
        }
    }
}