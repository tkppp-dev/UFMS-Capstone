package sj.sjesl.comment;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentSaveRequestDto {

    private Long adminId;
    private String content;

    @Builder
    public CommentSaveRequestDto(Long adminId, String content) {
        this.adminId = adminId;
        this.content = content;
    }
}
