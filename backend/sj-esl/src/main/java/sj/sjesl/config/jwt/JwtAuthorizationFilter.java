package sj.sjesl.config.jwt;

// 시큐리티가 filter 가지고 있는데 그 필터중에 BasicAuthenticationFilter 라는 것이 있다.
//권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어 있다.
//만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 타지 않는다.!

import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import sj.sjesl.config.auth.PrincipalDetail;
import sj.sjesl.entity.Member;
import sj.sjesl.repository.MemberRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {


    private MemberRepository memberRepository;
    private JwtTokenProvider jwtTokenProvider;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, MemberRepository memberRepository) {
        super(authenticationManager);
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberRepository = memberRepository;
    }


    //인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 거치게 된다.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Read the Authorization header, where the JWT token should be
        String header = request.getHeader("Authorization");

        // If header does not contain BEARER or is null delegate to Spring impl and exit
        if (header == null || !header.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }
        // If header is present, try grab user principal from database and perform authorization
        Authentication authentication = getUsernamePasswordAuthentication(request);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Continue filter execution
        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {
        String token = request.getHeader("Authorization")
                .replace("Bearer","");

        if (token != null) {
            Claims claims = jwtTokenProvider.getClaims(token);
            Long id = Long.parseLong(claims.getSubject()); // getSubject 값은 users의 id값

            if (id != null) {
                Optional<Member> omember= memberRepository.findById(id);
//                Optional<User> oUser = userRepository.findById(id);
//                User user = oUser.get();
                Member member = omember.get();

//                UserPrincipal principal = UserPrincipal.create(user);
                PrincipalDetail principalDetail= PrincipalDetail.create(member);
                // OAuth 인지 일반 로그인인지 구분할 필요가 없음. 왜냐하면 password를 Authentication이 가질 필요가 없으니!!
                // JWT가 로그인 프로세스를 가로채서 인증다 해버림. (OAuth2.0이든 그냥 일반 로그인 이든)

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(principalDetail, null, principalDetail.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication); // 세션에 넣기
                return authentication;
            }
        }
        return null;
    }


}
