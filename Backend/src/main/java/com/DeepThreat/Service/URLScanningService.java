package com.DeepThreat.Service;

import org.springframework.stereotype.Service;
//login, account, verify, update, secure, bank, free, gift, c
@Service
public class URLScanningService {
    public int suspiciousKeywordsChecks(String url){
        if(url.contains("login")||url.contains("account")||url.contains("verify")||url.contains("update")||url.contains("secure")||url.contains("bank")||url.contains("free")||url.contains("gift")||url.contains("prize")){
            return 3;
        }else{
            return 0;
        }
    }
    public int finalPointStable(String url){
        int pointCheck = 0;
        pointCheck += suspiciousKeywordsChecks(url);
    }
}
