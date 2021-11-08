package sj.sjesl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.MemberPrivileges;
import sj.sjesl.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Transactional
    public Member join(Member member){
        String rawPassword= member.getPassword();
        String encPassword= encoder.encode(rawPassword);
        member.setPassword(encPassword);

        member.setPrivileges(MemberPrivileges.STUDENT);   //나중에 바꿀것.
        Member save = memberRepository.save(member);
        return save;
    }


}
