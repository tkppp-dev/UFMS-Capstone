package sj.sjesl.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.inquiry.InquiryResponseDto;
import sj.sjesl.inquiry.InquirySaveRequestDto;
import sj.sjesl.inquiry.InquiryService;
import sj.sjesl.inquiry.InquiryUpdateRequestDto;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommentApiController {

    private final CommentService commentService;

    @GetMapping("/inquiry/{id}/comment/")    //모두 조회
    public List<Comment> getCommentList(@PathVariable Long id) {
        return commentService.getCommentList(id);
    }

    @PostMapping("/inquiry/{id}/comment")    //등록
    public Long save(@PathVariable Long id, @RequestBody CommentSaveRequestDto requestDto) {
        return commentService.save(id, requestDto);
    }

    @PutMapping("/inquiry/{id}/comment/{commentId}")    //내용 변경
    public Long update(@PathVariable Long id, @PathVariable Long commentId, @RequestBody String requestDto) {
        return commentService.update(commentId, requestDto);
    }

    @GetMapping("/inquiry/{id}/comment/commentId")    //조회
    public CommentResponseDto findById(@PathVariable Long id, @PathVariable Long commentId) {
        return commentService.findById(commentId);
    }

    @DeleteMapping("/inquiry/{id}/comment/{commentId}") //삭제
    public Long delete(@PathVariable Long id, @PathVariable Long commentId) {
        commentService.delete(commentId);
        return id;
    }
}
