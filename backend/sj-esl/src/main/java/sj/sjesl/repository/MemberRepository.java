package sj.sjesl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sj.sjesl.entity.Member;

public interface MemberRepository extends JpaRepository<Member,String> {
}
