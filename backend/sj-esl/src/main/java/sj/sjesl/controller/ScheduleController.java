package sj.sjesl.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sj.sjesl.dto.ScheduleDateRequestDto;
import sj.sjesl.dto.ScheduleResponseDto;
import sj.sjesl.service.ScheduleService;

import java.util.List;

@Api(tags = "스케줄 API")
@RequiredArgsConstructor
@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;

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
}
