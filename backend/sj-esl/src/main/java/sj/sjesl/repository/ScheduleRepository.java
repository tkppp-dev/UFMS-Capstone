package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Schedule;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    List<Schedule> findAllByMember(Member member);

    @Query(value = "select s from Schedule  s where s.member = ?1 and s.Subject_id =?2")
    Schedule findByMemberAndSubject_id(Member member,Long subject_id);
}
