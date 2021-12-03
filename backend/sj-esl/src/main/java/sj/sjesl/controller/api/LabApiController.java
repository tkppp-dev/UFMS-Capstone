package sj.sjesl.controller.api;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.dto.lab.LabRequestDto;
import sj.sjesl.dto.lab.LabResponseDto;
import sj.sjesl.dto.lab.LabSaveRequestDto;
import sj.sjesl.entity.Lab;
import sj.sjesl.entity.Member;
import sj.sjesl.payload.Response;
import sj.sjesl.repository.LabRepository;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.service.LabService;

import java.util.ArrayList;
import java.util.List;

@Api(tags = "연구실 조회/ 공지사항/ 상태 변경 ")
@RequiredArgsConstructor
@RestController
@RequestMapping("/schedule")
public class LabApiController {
    private final LabService labService;
    private final LabRepository labRepository;
    private final MemberRepository memberRepository;
    private final Response response;
    @GetMapping("/lab/{id}")    //lab 정보
    @ApiOperation(value = "교수 멤버아이디 넣고 해당하는 연구실 정보")
    public ResponseEntity<?> index(@PathVariable Long id) {  //변경해야함

        Member member1 = memberRepository.findById(id).get();
        if (member1==null) return response.fail("해당하는 유저가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        List<Lab> byMember = labRepository.findByMember(member1);
        if (byMember.size()==0) return response.fail("해당하는 연구실이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);


        System.out.println(byMember);
        List<Lab> labs= byMember;
        return response.success(byMember,"조회성공",HttpStatus.OK);
    }

    @GetMapping("/lab/save")    //연구실추가 페이지
    @ApiOperation(value = "연구실 추가 페이지 이동")
    public String labSave() {
        return "lab-save";
    }


    @PostMapping("/lab")    //연구실 등록
    @ApiOperation(value = "연구실 추가")
    public ResponseEntity<?> save(@RequestBody LabSaveRequestDto requestDto) {
        return labService.save(requestDto);
    }

    @PutMapping("/lab/notice/{id}")    //공지사항 변경
    @ApiOperation(value = "연구실 공지사항 변경")

    public ResponseEntity<?> Update_1(@PathVariable Long id, @RequestBody LabRequestDto.noticeLab notice) throws Exception {
        System.out.println(notice.toString()+"22222222222222222222");
        return labService.noticeUpdate(id, notice);
    }


    @PutMapping("/lab/state/{id}")    //상태 변경
    @ApiOperation(value = "연구실 상태 변경")

    public ResponseEntity<?> Update_2(@PathVariable Long id, @RequestBody LabRequestDto.stateLab state) throws Exception {
        return labService.stateUpdate(id, state);

    }



    @DeleteMapping("/lab/{id}") //연구실 삭제
    @ApiOperation(value = "연구실 삭제")

    public Long delete(@PathVariable Long id) {
        labRepository.deleteById(id);
        return id;
    }

    @PostMapping("/lab/professor")
    @ApiOperation(value = "연구실 현황 조회(교수이름)")
    public  List<LabResponseDto.Lab> LabSearch(@RequestBody LabRequestDto.LabProfessor labProfessor){
        Member member = memberRepository.findUsername(labProfessor.getProfessorName());
        List<Lab> byMember = labRepository.findByMember(member);
        List<LabResponseDto.Lab> labs=new ArrayList<>();
        for( Lab l : byMember){
            labs.add(new LabResponseDto.Lab(l));
        }

        return labs;

    }
}