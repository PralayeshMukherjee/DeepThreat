package com.DeepThreat.Controller;

import com.DeepThreat.DTO.URLDTO;
import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Service.HistoryService;
import com.DeepThreat.Service.ThreatDetection;
import com.DeepThreat.Service.URLScanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
        String email = urldto.getEmail();
        Map<String,String> fianlMap  = new HashMap<>();
        Map<String,String> urlChecking = urlScanningService.isStatusOfUrl(url,email);
        fianlMap.put("mal",urlChecking.get("mal"));
        fianlMap.put("sus",urlChecking.get("sus"));
        fianlMap.put("safe",urlChecking.get("safe"));
        String st = String.valueOf(threatDetection.isThreatDetect(url));
        fianlMap.put("threat",st);
        return fianlMap;
    }
    public List<UserURLHistoryEntity> urlHistory(@RequestParam String email){
        return historyService.urlSearchedHistory(email);
    }
}
