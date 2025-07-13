package com.DeepThreat.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class JwtValidation {
    @GetMapping("/token-validation")
    public ResponseEntity<Map<String,String>> tokenValidation (Principal principal){
        return ResponseEntity.ok(Map.of(
                "isTokenValid","true",
                "email",principal.getName()
        ));
    }
}
