package com.DeepThreat.Controller;

import com.DeepThreat.Authentication.JwtUtil;
import com.DeepThreat.Service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class JwtValidation {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserService userService;
    @GetMapping("/token-validation")
    public Map<String,String> tokenValidation (@RequestParam String token){
        try {
            Claims claims = jwtUtil.parseToken(token);
            String email = claims.getSubject();
            if(userService.validUser(email)){
                return Map.of("isExpired","true");
            }else {
                return Map.of("isExpired","false");
            }
        }catch (ExpiredJwtException e){
            return Map.of("isExpired","false");
        }catch (Exception e){
            return Map.of("isExpired","wrong");
        }
    }
}
