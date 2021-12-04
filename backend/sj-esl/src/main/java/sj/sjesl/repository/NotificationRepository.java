package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByMember(Member member);
}
