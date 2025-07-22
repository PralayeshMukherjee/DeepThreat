package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class URLAPIChecking {
    @Value("${google.safe.browsing.api.key}")
    private String googleSafeBrowsingApiKey;
    private static final String googleApiUrl = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=%s";
}
