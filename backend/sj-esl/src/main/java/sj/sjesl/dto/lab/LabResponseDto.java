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

}
