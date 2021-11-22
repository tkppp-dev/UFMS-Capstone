package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sj.sjesl.entity.Facility;

import java.util.List;

public interface FacilityRepository extends JpaRepository<Facility,Long> {
    @Query("SELECT DISTINCT p.building FROM Facility p WHERE p.category = ?1")
    List<String> findBuildingByCategory(String category);

    @Query("SELECT p.name FROM Facility p WHERE p.category = ?1")
    List<String> findNameByCategory(String category);

//    @Query("SELECT p FROM Facility p WHERE p.building = ?1 and p.floor = ?2 and p.category = ?3")
    List<Facility> findByBuildingAndFloorAndCategory(String building, String floor, String category);

    Facility findByName(String name);

    @Query("SELECT p.name FROM Facility p WHERE p.building = ?1 and p.category = ?2")
    List<String> findAllByBuildingAndCategory(String building, String category);

    @Query("select distinct p.floor from Facility p where p.building = ?1 and p.category = ?2")
    List<String> findFloorByBuildingAndCategory(String building, String category);
}
