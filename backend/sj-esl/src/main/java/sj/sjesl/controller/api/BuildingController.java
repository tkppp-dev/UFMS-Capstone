package sj.sjesl.controller.api;


import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sj.sjesl.entity.Building;
import sj.sjesl.repository.BuildingRepository;

import java.util.List;

@Api(tags = "건물 정보 ")
@RequiredArgsConstructor
@RestController

public class BuildingController {

    @Autowired
    BuildingRepository buildingRepository;

    @GetMapping("/building")
    public List<Building> findAll(){
        return buildingRepository.findAll();
    }
}
