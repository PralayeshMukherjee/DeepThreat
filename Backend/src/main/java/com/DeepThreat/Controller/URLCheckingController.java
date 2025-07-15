package com.DeepThreat.Controller;

import com.DeepThreat.DTO.URLDTO;
import com.DeepThreat.Service.URLScanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/urlChecker")
public class URLCheckingController {
    @Autowired
    private URLScanningService urlScanningService;
    public Map<String,String> urlChecker(@RequestBody URLDTO urldto){
        String url = urldto.getUrl();
        String result = urlScanningService.domainChecker(url);
    }
}
