package sj.sjesl.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import sj.sjesl.entity.Reservation;

import javax.validation.constraints.NotEmpty;

@Data
public class ScheduleAddRequestDto {
    private Long memberId;
    private Long subjectId;

    @Data
    public static class DeleteId {
        private Long scheduleId;
    }

    @Data
    public static class subjectSearch {
        private String type;
        private String searchData;
    }
}
