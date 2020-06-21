package com.hexaware.hackathon.aldia.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.hackathon.aldia.domain.UserInfo;
import com.hexaware.hackathon.aldia.repository.UserInfoRepository;
import com.hexaware.hackathon.aldia.security.JwtRequest;
import com.hexaware.hackathon.aldia.security.JwtToken;
import com.hexaware.hackathon.aldia.service.impl.JwtUserDetailsService;

@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Autowired
    private UserInfoRepository userInfoRepository;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {


        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtUserDetailsService

                .loadUserByUsername(authenticationRequest.getUsername());

        return ResponseEntity.ok(generateResponse(userDetails,authenticationRequest.getUsername()));

    }
    
    private Map<String, Object> generateResponse(UserDetails userDetails, String username) {
        final String token = jwtToken.generateToken(userDetails);
        UserInfo user = userInfoRepository.findByUsername(username);
        Map<String, Object> map = new HashMap<>(); 
        map.put("token", token);
        map.put("role", user.getRole());
        map.put("userId", user.getId());
        return map;
    }
    
    private void authenticate(String username, String password) throws Exception {

        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        } catch (DisabledException e) {

            throw new Exception("USER_DISABLED", e);

        } catch (BadCredentialsException e) {

            throw new Exception("INVALID_CREDENTIALS", e);

        }

    }

}
