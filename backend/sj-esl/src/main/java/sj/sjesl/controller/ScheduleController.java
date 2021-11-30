package sj.sjesl.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.dto.ScheduleAddRequestDto;
import sj.sjesl.dto.ScheduleDateRequestDto;
import sj.sjesl.dto.ScheduleResponseDto;
import sj.sjesl.entity.Subject;
import sj.sjesl.repository.ScheduleRepository;
import sj.sjesl.repository.SubjectRepository;
import sj.sjesl.service.ScheduleService;

import java.util.List;

@Api(tags = "스케줄 API")
@RequiredArgsConstructor
@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final ScheduleRepository scheduleRepository;
    private final SubjectRepository subjectRepository;

    @ApiOperation(value = "현재 스케줄 조회")
    @GetMapping("/schedule/now/{id}")
    public ScheduleResponseDto getNow(@PathVariable Long id) {
        return scheduleService.getNow(id);
    }

    @ApiOperation(value = "다음 스케줄 조회")
    @GetMapping("/schedule/next/{id}")
    public ScheduleResponseDto getNext(@PathVariable Long id) {
        return scheduleService.getNext(id);
    }

    @ApiOperation(value = "일주일 스케줄 리스트 조회")
    @PostMapping("/schedule")
    public List<List<ScheduleResponseDto>> getWeek(@RequestBody ScheduleDateRequestDto requestDto) {
        return scheduleService.getWeek(requestDto);
    }


    @ApiOperation(value = "스캐줄 추가")
    @PostMapping("/schedule/add")
    public ScheduleAddRequestDto add(@RequestBody ScheduleAddRequestDto scheduleAddRequestDto) {

        return scheduleService.add(scheduleAddRequestDto);
    }

    @ApiOperation(value = "스캐줄 삭제")
    @PostMapping("/schedule/delete")
    public ScheduleAddRequestDto.DeleteId delete(@RequestBody ScheduleAddRequestDto.DeleteId deleteId) {
        scheduleRepository.deleteById(deleteId.getScheduleId());
        return deleteId;
    }

    @ApiOperation(value = "과목 검색(professor or subject)")
    @PostMapping("/schedule/subject")
    public List<Subject> subjectSearch(@RequestBody ScheduleAddRequestDto.subjectSearch search) {
        System.out.println(search.toString());
        if (search.getType().equals("professor")) {
            System.out.println(search.getSearchData());
            return subjectRepository.findAllByProfessor(search.getSearchData().toString());
        } else if (search.getType().equals("subject"))
            return subjectRepository.findAllBySubjectName(search.getSearchData());
        return null;
    }

    @ApiOperation(value = "등록한 과목 검색")
    @GetMapping("/schedule/subject/{id}")
    public List<Subject> getSubjectList(@PathVariable Long id) {
        return scheduleService.getSubject(id);
    }
}

