package sj.sjesl.inquiry;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "문의 API")
@RequiredArgsConstructor
@RestController
public class InquiryApiController {

    private final InquiryService inquiryService;

    @ApiOperation(value = "문의 리스트 조회")
    @GetMapping("/inquiry")    //문의 리스트 조회
    public List<InquiryListResponseDto> findAllDesc() {
        return inquiryService.findAllDesc();
    }

    @ApiOperation(value = "내 문의 리스트 조회")
    @GetMapping("/inquiry/my/{memberId}")    //내 문의 리스트 조회
    public List<InquiryResponseDto> findByMemberDesc(@PathVariable Long memberId) {
        return inquiryService.findByMemberDesc(memberId);
    }

    @ApiOperation(value = "문의 등록")
    @PostMapping("/inquiry")    //문의 등록
    public Long save(@RequestBody InquirySaveRequestDto requestDto) {
        return inquiryService.save(requestDto);
    }

    @ApiOperation(value = "문의 내용 변경")
    @PutMapping("/inquiry/{id}")    //문의 내용 변경
    public Long update(@PathVariable Long id, @RequestBody InquiryUpdateRequestDto requestDto) {
        return inquiryService.update(id, requestDto);
    }

    @ApiOperation(value = "문의 상세 내용 조회")
    @GetMapping("/inquiry/{id}")    //문의 조회
    public InquiryResponseDto findById(@PathVariable Long id) {
        return inquiryService.findById(id);
    }

    @ApiOperation(value = "문의 삭제")
    @DeleteMapping("/inquiry/{id}") //문의 삭제
    public Long delete(@PathVariable Long id) {
        inquiryService.delete(id);
        return id;
    }
}
