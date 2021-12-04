package sj.sjesl.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification extends BaseEntity {

    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    private LocalDateTime reservationTime;
    private String reservationUserName;
    private String reservationName;
    private String noticeDetails;
    //reservation_update,cancel  , inquiry, rental
    private String type;

    @Builder
    public Notification(Member member, LocalDateTime reservationTime, String reservationUserName, String reservationName, String noticeDetails, String type) {
        this.member = member;
        this.reservationTime = reservationTime;
        this.reservationUserName = reservationUserName;
        this.reservationName = reservationName;
        this.noticeDetails = noticeDetails;
        this.type = type;
    }
}
