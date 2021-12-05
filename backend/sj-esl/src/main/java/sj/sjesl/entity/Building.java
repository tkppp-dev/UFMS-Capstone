package sj.sjesl.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sj.sjesl.dto.building.BuildingDto;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor

public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id")
    private Long id;

    private String name;

    private String img;

    @Column(length = 5000)
    private String description;
    private int highestFloor;
    private int lowestFloor;


    @Builder
    public Building(String name, String img, String description, int highestFloor, int lowestFloor) {
        this.name = name;
        this.img = img;
        this.description = description;
        this.highestFloor = highestFloor;
        this.lowestFloor = lowestFloor;
    }

    public Building(BuildingDto.RequestBuilding dto) {
        this.name = dto.getName();
        this.img = dto.getImg();
        this.description = dto.getDescription();
        this.highestFloor = dto.getHighestFloor();
        this.lowestFloor = dto.getLowestFloor();
    }

    public void update(BuildingDto.RequestBuilding dto){
        this.name = dto.getName();
        this.img = dto.getImg();
        this.description = dto.getDescription();
        this.highestFloor = dto.getHighestFloor();
        this.lowestFloor = dto.getLowestFloor();
    }
}
