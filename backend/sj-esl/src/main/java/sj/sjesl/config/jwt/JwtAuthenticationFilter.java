package sj.sjesl.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sj.sjesl.config.auth.PrincipalDetail;
import sj.sjesl.entity.Member;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


//스프링 시큐리티에서 UsernamePasswordAuthenticationFilter가 있음
// login 요청해서 username, password 전소하면 (POST)
//UsernamePasswordAuthenticationFilter동작을 함

@RequiredArgsConstructor

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    // 로그인 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter: 로그인 시도중");
        //1.username, password 받아서
        try {
//            BufferedReader br= request.getReader();
//            String input=null;
//            while((input= br.readLine()) !=null){
//                System.out.println(input);
            ObjectMapper om= new ObjectMapper();
            Member member= om.readValue(request.getInputStream(),Member.class);
            System.out.println(member);

            UsernamePasswordAuthenticationToken authenticationToken=
                    new UsernamePasswordAuthenticationToken(member.getEmail(),member.getPassword());

            //PrincipalDetailService 호출 loa dUserByUsername() 함수가 실행.
            Authentication authentication =
                    authenticationManager.authenticate(authenticationToken);

            // 로그인이 됨
            PrincipalDetail principalDetail= (PrincipalDetail) authentication.getPrincipal();
            System.out.println("로그인 완료: "+principalDetail.getMember().toString());
            // authentication 객체가 session 영역에 저장을 하고 그 방법이 return 해주면 된다.
            // return의 이유는 권한 관리를 security가 대신 해주기 때문에 편하려고 하는 것.
            // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리 때문에 session 넣어 준다.


            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행.
    //JWT 토큰을 만들어서 request 요청한 사용자에게 JWT토큰을 response 해주면 된다.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("successfulAuthentication 실행됨 :인증이 완료됨");
        PrincipalDetail principalDetail= (PrincipalDetail) authResult.getPrincipal();

        //RSA방식 X Hash 암호 방식.

        String token = jwtTokenProvider.create(authResult);
        response.addHeader("Authorization", "Bearer " +  token);

//        response.addHeader("Authorization","Bearer "+jwtToken);
    }
}
