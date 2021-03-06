package sj.sjesl.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lab{
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "lab_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String location;
    private String state;
    private LocalDateTime scheduleStartDate;
    private LocalDateTime scheduleEndDate;
    private String content;
    private String notice;
    private String name;

    @Builder
    public Lab(Member member, String location,String name) {
        this.member = member;
        this.location = location;
        this.name=name;
    }

    @Override
    public String toString() {
        return "Lab{" +
                ", location='" + location + '\'' +
                ", state='" + state + '\'' +

                ", notice='" + notice + '\'' +
                '}';
    }

    public void noticeUpdate(String notice){
        this.notice=notice;
    }

    public void stateUpdate(String state){
        this.state=state;
    }
}
