package sj.sjesl.config.auth;

import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.filter.CorsFilter;
import sj.sjesl.config.jwt.JwtAuthenticationFilter;
import sj.sjesl.config.jwt.JwtAuthorizationFilter;
import sj.sjesl.config.jwt.JwtTokenProvider;
import sj.sjesl.entity.Member;
import sj.sjesl.entity.MemberPrivileges;
import sj.sjesl.filter.MyFilter1;
import sj.sjesl.filter.MyFilter3;
import sj.sjesl.payload.ApiResponse;
import sj.sjesl.repository.MemberRepository;
import sj.sjesl.service.MemberService;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private final CorsFilter corsFilter;


    final private HttpSession httpSession;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private PrincipalDetailService principalDetailService;

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Bean // IoC 관리
    public BCryptPasswordEncoder encodePWD() {
        return new BCryptPasswordEncoder();
    }

    //시큐리티가 대신 로그인해주는데 password를 가로채기하는데
    //해당 password가 뭘로 해쉬가 되어 회원가입이 되었는지 알아야
    //같은 해쉬로 암호화해서 DB에 있는 해쉬랑 비교할 수 있음
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(principalDetailService).passwordEncoder(encodePWD());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.addFilterBefore(new MyFilter3(), SecurityContextPersistenceFilter.class);
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(corsFilter)
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(),jwtTokenProvider)) //AuthenticationManger
                .addFilter(new JwtAuthorizationFilter(authenticationManager(),jwtTokenProvider,memberRepository)) //AuthenticationManger
                .authorizeRequests()
                .antMatchers("/", "/api/auth/login", "/api/auth/**", "/api/user/register/**","/login").permitAll()
//                .antMatchers("/member/**").hasRole("GUEST") //수정해야할부분
                .antMatchers("/member/**").access("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN') or hasRole('ROLE_GUEST')") //수정해야할부분
                .antMatchers("/inquiry/**").access("hasRole('ROLE_STUDENT') or hasRole('ROLE_PROFESSOR') or hasRole('ROLE_GUEST') or  hasRole('ROLE_ADMIN') ")
                //GUEST,STUDENT,PROFESSOR,ADMIN
//                .and()
//                .exceptionHandling().accessDeniedPage("/accessDenied")
                .and()
//                .logout().logoutUrl("/api/auth/logout")
//                .logoutSuccessUrl("/").permitAll() //로그아웃시 이동 주소
//                .and()
//                .formLogin()
//                .defaultSuccessUrl("/")
//                .loginPage("/api/auth/login");
//                .loginProcessingUrl("/api/auth/loginProc")//스프링  시큐리티가 해당 주소로 요청하는 로그인을 가로챈다
//                .and()
                .oauth2Login().loginPage("/api/auth/login")
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

                        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                        Map<String, Object> res = (Map<String, Object>) oAuth2User.getAttributes();
                        String email = null;
                        if (request.getRequestURI().equals("/login/oauth2/code/kakao")) {
                            Map<String, Object> profile = (Map<String, Object>) res.get("kakao_account");
                            email = (String) profile.get("email");
                        } else if (request.getRequestURI().equals("/login/oauth2/code/google")) {
                            email = (String) res.get("email");
                        } else {
                            Map<String, Object> naverRes = (Map<String, Object>) res.get("response");
                            email = (String) naverRes.get("email");
                        }

                        String token = jwtTokenProvider.create(authentication);
                        response.addHeader("Authorization", "Bearer " +  token);
                        System.out.println(token);
                        String targetUrl = "/api/auth/success";

                        Optional<Member> member = memberRepository.findByEmail(email);
                        System.out.println(member.get().getMobile());

                        if (member.get().getMobile() == null)
                            targetUrl="/api/auth/register";//이메일이 null이면 join 페이지로 이동

                        RequestDispatcher dis = request.getRequestDispatcher(targetUrl);
                        System.out.println(dis);

                        dis.forward(request, response);
                    }
                });

    }

}
