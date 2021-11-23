package sj.sjesl.inquiry;

import lombok.Getter;
import sj.sjesl.entity.ReservationInquiry;

import java.time.LocalDateTime;

@Getter
public class InquiryResponseDto {

    private Long id;
    private Long memberId;
    private LocalDateTime modifiedDate;
    private String author;
    private String title;
    private String content;

    public InquiryResponseDto(ReservationInquiry entity) {
        this.id = entity.getId();
        this.memberId = entity.getMember().getMemberId();
        this.author = entity.getMember().getUsername();
        this.modifiedDate = entity.getUpdateDate();
        this.title = entity.getTitle();
        this.content = entity.getContent();
    }
}