package sj.sjesl.rental;

import lombok.Getter;
import lombok.NoArgsConstructor;
import sj.sjesl.entity.Facility;

@Getter
@NoArgsConstructor
public class RentalFacilityResponseDto {

    private String name;
    private String building;
    private String floor;
    private int capacity;
    private int cost;
    private String purpose;
    private int area;
    private String time;
//    private String option;
    private String notice;
    private String img;

    public RentalFacilityResponseDto(Facility facility) {
        this.name = facility.getName();
        this.building = facility.getBuilding();
        this.floor = facility.getFloor();
        this.capacity = facility.getCapacity();
        this.cost = facility.getCapacity();
        this.purpose = facility.getPurpose();
        this.area = facility.getArea();
        this.time = facility.getTime();
//        this.option = facility.getOption();
        this.notice = facility.getNotice();
        this.img = facility.getImg();
    }
}
