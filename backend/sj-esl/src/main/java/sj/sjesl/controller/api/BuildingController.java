package sj.sjesl.controller.api;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.dto.ScheduleAddRequestDto;
import sj.sjesl.dto.building.BuildingDto;
import sj.sjesl.dto.lab.LabRequestDto;
import sj.sjesl.entity.Building;
import sj.sjesl.payload.Response;
import sj.sjesl.repository.BuildingRepository;

import java.util.List;
import java.util.Optional;

@Api(tags = "건물 API ")
@RequiredArgsConstructor
@RestController

public class BuildingController {

    private final Response response;

    private final BuildingRepository buildingRepository;

    @GetMapping("/building")
    public List<Building> findAll(){
        return buildingRepository.findAll();
    }

    @PostMapping("/building")
    @ApiOperation(value = "건불 추가")
    @Transactional
    public ResponseEntity<?> save(@RequestBody BuildingDto.Request building){
        Building save = buildingRepository.save(new Building(building));
        return response.success(save,"성공적으로 추가되었습니다", HttpStatus.OK);
    }

    @PutMapping("/building/{id}")    //공지사항 변경
    @ApiOperation(value = "건물 변경")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody BuildingDto.Request building){
        Optional<Building> byId = buildingRepository.findById(id);
        byId.get().update(building);
        return response.success(byId.get(),"성공적으로 변경되었습니다", HttpStatus.OK);
    }


    @ApiOperation(value = "건물 삭제")
    @PostMapping("/building/delete")
    @Transactional
    public  ResponseEntity<?> delete(@RequestBody BuildingDto.DeleteId deleteId) {
        buildingRepository.deleteById(deleteId.getBuildingId());
        return response.success("건물삭제를 완료하였습니다.", HttpStatus.OK);
    }

}
