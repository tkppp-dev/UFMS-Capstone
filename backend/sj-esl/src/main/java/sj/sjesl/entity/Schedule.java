package sj.sjesl.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Long Subject_id;
    private Long facility_id;

    @Builder
    public Schedule(Member member, Long subject_id, Long facility_id) {
        this.member = member;
        Subject_id = subject_id;
        this.facility_id = facility_id;
    }
}
