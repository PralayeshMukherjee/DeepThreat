package com.DeepThreat.Controller;

import com.DeepThreat.DTO.URLDTO;
import com.DeepThreat.Service.URLScanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/urlChecker")
public class URLCheckingController {
    @Autowired
    private URLScanningService urlScanningService;
    @PostMapping("/check")
    public Map<String,String> urlChecker(@RequestBody URLDTO urldto){
        String url = urldto.getUrl();
        Map<String,String> map = urlScanningService.isStatusOfUrl(url);
        return Map.of("mal",mal,
                "sus",sus,
                "safe",safe
        );
    }
}
