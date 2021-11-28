package sj.sjesl.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ScheduleDateRequestDto {

    private Long memberId;
    private LocalDate startDate;
    private LocalDate endDate;

    @Builder
    public ScheduleDateRequestDto(Long memberId, LocalDate startDate, LocalDate endDate) {
        this.memberId = memberId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
