package sj.sjesl.dto.lab;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import sj.sjesl.entity.MemberPrivileges;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class LabResponseDto {

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Lab {

        private String location;
        private String state;
        private String notice;

        @Override
        public String toString() {
            return "Lab{" +
                    "location='" + location + '\'' +
                    ", state='" + state + '\'' +
                    ", notice='" + notice + '\'' +
                    '}';
        }

        public Lab() {
        }
    }


    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class StateLab
    {

        private Long memberId;
        private String state;


        @Override
        public String toString() {
            return "StateLab{" +
                    "memberId=" + memberId +
                    ", state='" + state + '\'' +
                    '}';
        }
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class noticeLab
    {

        private Long memberId;
        private String notice;

        @Override
        public String toString() {
            return "noticeLab{" +
                    "memberId=" + memberId +
                    ", notice='" + notice + '\'' +
                    '}';
        }
    }

}
