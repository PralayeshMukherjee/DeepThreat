package com.DeepThreat.Controller;

import com.DeepThreat.DTO.URLDTO;
import com.DeepThreat.Service.ThreatDetection;
import com.DeepThreat.Service.URLScanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/urlChecker")
public class URLCheckingController {
    @Autowired
    private URLScanningService urlScanningService;
    @Autowired
    private ThreatDetection threatDetection;
    @PostMapping("/check")
    public Map<String,String> urlChecker(@RequestBody URLDTO urldto){
        String url = urldto.getUrl();
        Map<String,String> fianlMap  = new HashMap<>();
        Map<String,String> urlChecking = urlScanningService.isStatusOfUrl(url);
        fianlMap.put("mal",urlChecking.get("mal"));
        String st = String.valueOf(threatDetection.isThreatDetect(url));
        fianlMap.put("threat",st);
        return fianlMap;
    }
}
