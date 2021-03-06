package sj.sjesl.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import schemasMicrosoftComVml.impl.CTHandlesImpl;
import sj.sjesl.entity.BaseEntity;
import sj.sjesl.entity.Facility;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.ReservationStatus;
import sj.sjesl.reservation.ReservationRequestDto;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "facility_id")
    private Facility facility;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String reservationName;
    private String notice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReservationStatus reservationStatus;

    //    @OneToOne
//    @JoinColumn(name = "subject_id")
//    private Subject subject;
    private Long subjectId;

    @Builder
    public Reservation(Member member, Facility facility, LocalDateTime startTime, LocalDateTime endTime,
                       String reservationName, String notice, ReservationStatus reservationStatus,Long subjectId) {
        this.member = member;
        this.facility = facility;
        this.startTime = startTime;
        this.endTime = endTime;
        this.reservationName = reservationName;
        this.notice = notice;
        this.reservationStatus = reservationStatus;
        this.subjectId=subjectId;
    }

    public Reservation(LocalDateTime startTime, LocalDateTime endTime, String reservationName, String notice, ReservationStatus reservationStatus, Long subjectId) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.reservationName = reservationName;
        this.notice = notice;
        this.reservationStatus = reservationStatus;
        this.subjectId = subjectId;
    }
    public void update(ReservationRequestDto.update dto){
        this.reservationName=dto.getReservationName();
        this.notice= dto.getNotice();
    }
    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", reservationName='" + reservationName + '\'' +
                ", notice='" + notice + '\'' +
                ", reservationStatus=" + reservationStatus +
                ", subjectId=" + subjectId +
                '}';
    }
}