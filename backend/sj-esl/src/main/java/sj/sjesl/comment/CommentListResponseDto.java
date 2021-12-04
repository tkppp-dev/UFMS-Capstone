package sj.sjesl.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentListResponseDto {
    private Long id;
    private Long inquiryId;
    private Long memberId;
    private String memberName;
    private String content;
    private LocalDateTime modifiedDate;


    public CommentListResponseDto(Comment comment) {
        this.id = comment.getId();
        this.inquiryId = comment.getReservationInquiry().getId();
        this.memberId = comment.getMember().getMemberId();
        this.memberName = comment.getMember().getUsername();
        this.content = comment.getContent();
        this.modifiedDate = comment.getUpdateDate();
    }
}
