package sj.sjesl.inquiry;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class InquiryUpdateRequestDto {
    private String title;
    private String content;

}
