package sj.sjesl.dto.facility;

import lombok.Data;


public class FacilityDto {

    @Data
    public static class Request {
        private String name;

        private String building;

        private String floor;
        private String category;

        private int capacity;

        private int cost;
    }

    @Data
    public static class deleteid {
        private Long facilityId;
    }
}
