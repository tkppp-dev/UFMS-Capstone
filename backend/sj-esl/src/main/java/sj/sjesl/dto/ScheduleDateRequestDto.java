package sj.sjesl.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
public class ScheduleDateRequestDto {

    private Long memberId;
    private LocalDate startDate;
    private LocalDate endDate;


    public ScheduleDateRequestDto(Long memberId, LocalDate startDate, LocalDate endDate) {
        this.memberId = memberId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
