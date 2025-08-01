package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class VirusTotalService {
    @Value("${virustotal.api.key}")
    private String apikey;
    private String apiUrl;
}
