package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.ReservationInquiry;
import sj.sjesl.entity.Subject;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject,Long> {
    List<Subject> findAllByProfessor(String professorName);
    List<Subject> findAllBySubjectName(String subjectName);

    @Query(value = "SELECT s FROM Subject s WHERE s.id IN (?1)")
    List<Subject> findSubjectList(List<Long> ids);
}
