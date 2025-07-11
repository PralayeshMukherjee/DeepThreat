package com.DeepThreat.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    public String generateTokan(OAuth2User user){
        return Jwts.builder()
                .setSubject(user.getName())
                .claim("email",user.getAttributes())
                .claim("name",user.getAttributes())
                .setExpiration(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+expirationMs))
                .signWith(SignatureAlgorithm.HS512,jwtSecret)
                .compact();
    }
    public Claims parseToken(String token){
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
    }
}
