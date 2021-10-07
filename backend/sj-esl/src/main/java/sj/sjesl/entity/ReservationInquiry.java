package sj.sjesl.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.websocket.server.ServerEndpoint;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReservationInquiry extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "contact_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String inquiryTitle;
    private String inquiryDetails;

    private LocalDateTime answerDate;
    private String answerDetails;

    private LocalDateTime replyDate;
    private String replyDetails;


    public ReservationInquiry(Member member, String inquiryTitle, String inquiryContent) {
        this.member = member;
        this.inquiryTitle = inquiryTitle;
        this.inquiryDetails = inquiryContent;
    }
}
