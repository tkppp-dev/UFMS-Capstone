package sj.sjesl.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponseDto {

    private Long id;
    private Long memberId;
    private String memberName;
    private LocalDateTime modifiedDate;
    private String content;

    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.memberId = comment.getMember().getId();
        this.memberName = comment.getMember().getUsername();
        this.modifiedDate = comment.getUpdateDate();
        this.content = comment.getContent();
    }
}
