package sj.sjesl.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import sj.sjesl.entity.Reservation;
import sj.sjesl.entity.ReservationStatus;
import sj.sjesl.repository.ReservationRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@EnableScheduling
@Component
@RequiredArgsConstructor
public class ChangeStatus {

    private final ReservationRepository reservationRepository;

    @Scheduled(cron = "0 29,59 8-20 * * *")
    public void changStatus() {
        LocalDateTime startTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(LocalTime.now().getHour(), LocalTime.now().plusMinutes(1).getMinute()));
        LocalDateTime endTime = startTime.plusMinutes(90);

        List<Reservation> reservations = reservationRepository
                .findByStartTimeAndEndTimeAndAndReservationStatusIsNot(startTime, endTime, ReservationStatus.CANCEL);

        for (Reservation r : reservations) {
            if (r.getStartTime() == startTime)
                r.setReservationStatus(ReservationStatus.ING);
            else if (r.getEndTime() == endTime)
                r.setReservationStatus(ReservationStatus.END);
        }
    }
}
