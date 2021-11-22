package sj.sjesl.inquiry;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sj.sjesl.entity.ReservationInquiry;

@Getter
@NoArgsConstructor
public class InquirySaveRequestDto {

    private Long memberId;
    private String author;
    private String title;
    private String content;

}