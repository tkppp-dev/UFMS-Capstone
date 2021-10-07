package sj.sjesl.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Facility {

    @Id @GeneratedValue
    @Column(name = "facilityity_name")
    private String name;

    private String building;

    private String floor;

    private int capacity;

    private int cost;

    private String category;

    @OneToMany(mappedBy = "facility")
    private List<Reservation> reservations = new ArrayList<>();
}