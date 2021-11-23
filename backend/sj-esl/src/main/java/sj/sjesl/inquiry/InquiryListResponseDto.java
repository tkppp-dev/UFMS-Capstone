package sj.sjesl.inquiry;

import lombok.Getter;
import sj.sjesl.entity.ReservationInquiry;

import java.time.LocalDateTime;

@Getter
class InquiryListResponseDto {
    private Long id;
    private String author;
    private String title;
    private String content;
    private LocalDateTime modifiedDate;

    public InquiryListResponseDto(ReservationInquiry entity) {
        this.id = entity.getId();
        this.author = entity.getMember().getUsername();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.modifiedDate = entity.getUpdateDate();
    }
}