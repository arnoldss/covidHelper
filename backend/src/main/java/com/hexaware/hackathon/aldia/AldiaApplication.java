package com.hexaware.hackathon.aldia;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hexaware.hackathon.aldia.security.JwtAuthenticationEntryPoint;
import com.hexaware.hackathon.aldia.security.JwtRequestFilter;
import com.hexaware.hackathon.aldia.service.impl.JwtUserDetailsService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class AldiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(AldiaApplication.class, args);
	}
	
	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	    @Autowired
	    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	    @Autowired
	    private JwtUserDetailsService jwtUserDetailsService;

	    @Autowired
	    private JwtRequestFilter jwtRequestFilter;

	    @Autowired
	    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

	        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());

	    }

	    @Bean
	    public JwtAuthenticationEntryPoint jwtAuthenticationEntryPointBean() throws Exception{
	        return new JwtAuthenticationEntryPoint();
	    }


	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }

	    @Bean
	    @Override
	    public AuthenticationManager authenticationManagerBean() throws Exception {
	        return super.authenticationManagerBean();

	    }

	    @Override
	    protected void configure(HttpSecurity httpSecurity) throws Exception {

	        httpSecurity.csrf().disable().cors().and()

	                .authorizeRequests().antMatchers("/authenticate","/user").permitAll().

	        anyRequest().authenticated().and().

	        exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()

	                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

	    }

		@Bean
		CorsConfigurationSource corsConfigurationSource() {
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOrigins(Arrays.asList("*"));
			configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
			configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
			configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
			UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			source.registerCorsConfiguration("/**", configuration);
			return source;
		}

	}


}
