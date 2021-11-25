package sj.sjesl.dto.lab;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;


public class LabRequestDto {
    @Getter
    @NoArgsConstructor
    public static class stateLab
    {


        private String state;


        @Override
        public String toString() {
            return "stateLab{" +
                    "state='" + state + '\'' +
                    '}';
        }
    }

    @Getter
    @NoArgsConstructor
    public static class noticeLab
    {


        private String notice;

        @Override
        public String toString() {
            return "noticeLab{" +
                    "notice='" + notice + '\'' +
                    '}';
        }
    }
}
