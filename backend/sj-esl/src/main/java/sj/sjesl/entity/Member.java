package sj.sjesl.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member implements Persistable<String> {
    @Id
    private String memberId;

    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private MemberPrivileges privileges;

    @CreatedDate
    private LocalDateTime createDate;

    @OneToMany(mappedBy = "member")
    private List<ReservationInquiry> reservationInquiries= new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Lab> labs= new ArrayList<>();

    public Member(String memberId) {
        this.memberId = memberId;
    }


    @Override
    public String getId() {
        return memberId;
    }

    @Override
    public boolean isNew() {
        return createDate==null;
    }
}
