package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Building;

public interface BuildingRepository extends JpaRepository<Building, Long>{

    Building findByName(String name);
}
