package com.DeepThreat.Controller;

import com.DeepThreat.Authentication.JwtUtil;
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
    @GetMapping("/token-validation")
    public Map<String,String> tokenValidation (@RequestParam String token){

    }
}
