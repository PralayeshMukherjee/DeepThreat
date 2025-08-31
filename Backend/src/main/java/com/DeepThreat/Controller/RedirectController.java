package com.DeepThreat.Controller;

import com.DeepThreat.Authentication.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class RedirectController {
    @Autowired
    private JwtUtil jwtUtil;
    @GetMapping("/redirect")
    public void redirectAfterLogin(HttpServletResponse response, Authentication authentication) throws IOException{
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String jwtToken = jwtUtil.generateTokan(oAuth2User);
        response.sendRedirect("https://deepthreat.vercel.app/jwt-success?token=" + jwtToken);
    }
}
