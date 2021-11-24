package sj.sjesl.comment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentListResponseDto {
    private Long id;
    private String memberName;
    private String content;
    private LocalDateTime modifiedDate;


    public CommentListResponseDto(Comment comment) {
        this.id = comment.getId();
        this.memberName = comment.getMember().getUsername();
        this.content = comment.getContent();
        this.modifiedDate = comment.getUpdateDate();
    }
}
