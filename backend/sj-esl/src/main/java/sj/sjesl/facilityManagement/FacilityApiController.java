package sj.sjesl.facilityManagement;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.dto.building.BuildingDto;
import sj.sjesl.dto.facility.FacilityDto;
import sj.sjesl.entity.Building;
import sj.sjesl.entity.Facility;
import sj.sjesl.payload.Response;
import sj.sjesl.repository.BuildingRepository;
import sj.sjesl.repository.FacilityRepository;

import java.util.List;
import java.util.Optional;
@Api(tags = "시설물 API ")
@RequiredArgsConstructor
@RestController
public class FacilityApiController {



    private final Response response;

    private final FacilityRepository facilityRepository;

//    @GetMapping("/facility")
//    public List<Building> findAll(){
//        return facilityService.findAll();
//    }

    @PostMapping("/facility")
    @ApiOperation(value = "시설물 추가")
    @Transactional
    public ResponseEntity<?> save(@RequestBody FacilityDto.Request facility){
        Facility save = facilityRepository.save(new Facility(facility));
        return response.success(save,"성공적으로 추가되었습니다", HttpStatus.OK);
    }

    @PutMapping("/facility/{id}")
    @ApiOperation(value = "시설물 변경")
    @Transactional
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody FacilityDto.Request facility){
        Optional<Facility> byId = facilityRepository.findById(id);

        byId.get().updateApi(facility);
        return response.success(byId.get(),"성공적으로 변경되었습니다", HttpStatus.OK);
    }


    @ApiOperation(value = "시설물 삭제")
    @PostMapping("/facility/delete")
    @Transactional
    public ResponseEntity<?> delete(@RequestBody FacilityDto.deleteid deleteId) {
        System.out.println("222222222222222222222222222222222222222");
        System.out.println(deleteId.getFacilityId());
        facilityRepository.deleteById(deleteId.getFacilityId());
        return response.success("시설물 삭제를 완료하였습니다.", HttpStatus.OK);
    }
}
