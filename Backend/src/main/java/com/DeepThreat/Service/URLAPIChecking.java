package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class URLAPIChecking {
    @Value("${google.safe.browsing.api.key}")
    private String googleSafeBrowsingApiKey;
    private static final String googleApiUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=%s";
    private final RestTemplate restTemplate = new RestTemplate();
    public boolean isGoogleSafeBrowsing(String url){
        Map<String,Object> map = new HashMap<>();
        map.put("client", Map.of(
                "clientId", "deepthreat-app",
                "clientVersion", "1.0"
        ));

        map.put("threatInfo", Map.of(
                "threatTypes", List.of("MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"),
                "platformTypes", List.of("ANY_PLATFORM"),
                "threatEntryTypes", List.of("URL"),
                "threatEntries", List.of(Map.of("url", url))
        ));
        String finalUrl = String.format(googleApiUrl,googleSafeBrowsingApiKey);
    }
}
