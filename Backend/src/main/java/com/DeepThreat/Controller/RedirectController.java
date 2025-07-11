package com.DeepThreat.Controller;

import com.DeepThreat.Authentication.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.IOException;

public class RedirectController {
    @Autowired
    private JwtUtil jwtUtil;
    public void redirectAfterLogin(HttpServletResponse response, Authentication authentication) throws IOException{
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String jwtToken = jwtUtil.generateTokan(oAuth2User);
        response.sendRedirect("http://localhost:5173/jwt-success?token=" + jwtToken);
    }
}
