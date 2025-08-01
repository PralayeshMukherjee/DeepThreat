package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpRequest;
import java.util.Base64;

@Service
public class VirusTotalService {
    @Value("${virustotal.api.key}")
    private String apikey;
    @Value("${virustotal.api.url}")
    private String apiUrl;
    public int virusTotalCheck(String url){
        String encodedUrl = Base64.getUrlEncoder().encodeToString(url.getBytes());
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl+"/"+encodedUrl))
                .header("x-apikey",apikey).build();
    }
}
