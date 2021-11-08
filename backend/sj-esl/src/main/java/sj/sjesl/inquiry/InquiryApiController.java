package sj.sjesl.inquiry;

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class InquiryApiController {
    private final InquiryService inquiryService;

    @GetMapping("/inquiry")    //문의내역들 , 변경해야함
    public String index(Model model) {  //변경해야함
        model.addAttribute("inquiry", inquiryService.findAllDesc());
        return "inquiry";
    }

    @GetMapping("/inquiry/save")    //문의 등록창
    public String inquirySave() {
        return "inquiry-save";
    }

    @GetMapping("/inquiry/update/{id}") //문의 내용 변경창
    public String inquiryUpdate(@PathVariable Long id, Model model) {
        InquiryResponseDto dto = inquiryService.findById(id);
        model.addAttribute("inquiry", dto);

        return "inquiry-update";
    }


    @PostMapping("/inquiry")    //문의 등록
    public Long save(@RequestBody InquirySaveRequestDto requestDto) {
        return inquiryService.save(requestDto);
    }

    @PutMapping("/inquiry/{id}")    //문의 내용 변경
    public Long update(@PathVariable Long id, @RequestBody InquiryUpdateRequestDto requestDto) {
        return inquiryService.update(id, requestDto);
    }

    @GetMapping("/inquiry/{id}")    //문의 조회
    public InquiryResponseDto findById(@PathVariable Long id) {
        return inquiryService.findById(id);
    }

    @DeleteMapping("/inquiry/{id}") //문의 삭제
    public Long delete(@PathVariable Long id) {
        inquiryService.delete(id);
        return id;
    }
}
