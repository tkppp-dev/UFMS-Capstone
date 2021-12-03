package sj.sjesl.dto.building;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;

public class BuildingDto {


    @Data
    public static class Request {
        private String name;

        private String img;

        private String description;
        private int highestFloor;
        private int lowestFloor;



    }

    @Data
    public static class DeleteId {
        private Long buildingId;
    }


}
