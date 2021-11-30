package sj.sjesl.dto;

import lombok.Data;
import sj.sjesl.entity.Subject;

import javax.persistence.Column;

@Data
public class SubjectResponseDto {
    private Long scheduleId;
    private Long subjectId;

    private String major;
    private String classroom;
    private String subjectName;
    private String completionType;
    private String semester;
    private String professor;
    private String lectureDate;
    private String room;

    public SubjectResponseDto(Subject subject,Long scheduleId) {
        this.scheduleId = scheduleId;
        this.subjectId = subject.getId();
        this.major = subject.getMajor();
        this.classroom = subject.getClassroom();
        this.subjectName = subject.getSubjectName();
        this.completionType = subject.getCompletionType();
        this.semester = subject.getSemester();
        this.professor = subject.getProfessor();
        this.lectureDate = subject.getLectureDate();
        this.room = subject.getRoom();
    }
}
