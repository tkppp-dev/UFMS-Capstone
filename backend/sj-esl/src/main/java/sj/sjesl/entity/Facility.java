package sj.sjesl.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;
import sj.sjesl.dto.facility.FacilityDto;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Facility {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "facility_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String building;

    @Column(nullable = false)
    private String floor;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int cost;

    private String purpose;
    private int area;
    private String time;
    //    private String option;
    private String notice;
    private String img;

    @Column(nullable = false)
    private String category;

    @OneToMany(mappedBy = "facility")
    private List<Reservation> reservations = new ArrayList<>();

    @Builder
    public Facility(String name, String building, String floor, int capacity, int cost, String category) {
        this.name = name;
        this.building = building;
        this.floor = floor;
        this.capacity = capacity;
        this.cost = cost;
        this.category = category;
    }



    public void update(String name, String building, String floor, int capacity, int cost, String category){
        this.name = name;
        this.building = building;
        this.floor = floor;
        this.capacity = capacity;
        this.cost = cost;
        this.category = category;
    }

    public void updateApi(FacilityDto.Request dto){
        this.name = dto.getName();
        this.building = dto.getBuilding();
        this.floor = dto.getFloor();
        this.capacity = dto.getCapacity();
        this.cost = dto.getCost();
        this.category= dto.getCategory();

    }

    public  Facility(FacilityDto.Request dto){
        this.name = dto.getName();
        this.building = dto.getBuilding();
        this.floor = dto.getFloor();
        this.capacity = dto.getCapacity();
        this.cost = dto.getCost();
        this.category= dto.getCategory();

    }


    @Override
    public String toString() {
        return "Facility{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", building='" + building + '\'' +
                ", floor='" + floor + '\'' +
                ", capacity=" + capacity +
                ", cost=" + cost +
                ", category='" + category + '\'' +
                '}';
    }
}