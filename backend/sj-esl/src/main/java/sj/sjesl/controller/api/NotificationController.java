package sj.sjesl.controller.api;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import sj.sjesl.dto.NotificationDto;
import sj.sjesl.entity.Lab;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Notification;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.repository.NotificationRepository;
import sj.sjesl.reservation.ReservationResponseDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@Api(tags = "알림 API")
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;


    @GetMapping("/notification/{id}")    //알림 조회
    @ApiOperation(value = "멤버 아이디 넣고 알림 조회")
    @Transactional
    public List<NotificationDto.Response> find(@PathVariable Long id) {

      return notificationRepository.findByMember(memberRepository.findById(id).get())
              .stream()
              .map(NotificationDto.Response::new)
              .collect(Collectors.toList());
    }

}
