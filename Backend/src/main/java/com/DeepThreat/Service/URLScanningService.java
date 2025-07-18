package com.DeepThreat.Service;

import com.DeepThreat.Entity.URLHistoryEntity;
import com.DeepThreat.Repository.URLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.util.Map;
import java.util.Set;

//login, account, verify, update, secure, bank, free, gift, c
@Service
public class URLScanningService {
    @Autowired
    private URLHistoryRepository urlHistoryRepository;
    public int suspiciousKeywordsChecks(String url){
        if(url.contains("login")||url.contains("account")||url.contains("verify")||url.contains("update")||url.contains("secure")||url.contains("bank")||url.contains("free")||url.contains("gift")||url.contains("prize")){
            return 30;
        }else{
            return 0;
        }
    }
    public String extractHostName(String url){
        try{
            URL domain = new URL(url);
            return domain.getHost().toLowerCase();//this method return the host name from the url like if url is "https://bit.ly.com" then it return bit.ly but in lower case
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }
    public int shortenersURL(String url){
        Set<String> set = Set.of("bit.ly", "tinyurl.com", "t.co", "is.gd", "goo.gl", "ow.ly",
                "buff.ly", "rebrand.ly", "shorte.st", "adf.ly", "cutt.ly", "soo.gd");
        if(set.contains(extractHostName(url))){
            return 20;
        }else{
            return 0;
        }
    }
    public int ipAddressAsDomain(String url){
        try{
            URL domain = new URL(url);
            String host = domain.getHost().toLowerCase();
            String ipRegex = "^\\d{1,3}(\\.\\d{1,3}){3}$";
            if(host.matches(ipRegex)){
                return 20;
            }
        }catch (MalformedURLException e){
            throw new RuntimeException(e);
        }
        return 0;
    }
    public int NoOfSubdomains(String url){
        try{
            URL url1 = new URL(url);
            String domain = url1.getHost().toLowerCase();
            int dotCount = domain.split("\\.").length;
            if(dotCount>3){
                return 10;
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return 0;
    }
    public int mismatchedTopLevelDomain(String url){
        Set<String> trustedURL = Set.of("com", "org", "net", "edu", "gov", "in");
        try{
            URL url1 = new URL(url);
            String domain = url1.getHost().toLowerCase();
            String[] str = domain.split("\\.");
            if(!trustedURL.contains(str[str.length-1])){
                return 10;
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return 0;
    }
    public int suspiciousChecking(String url){
        int suspicious = 0;
        suspicious += suspiciousKeywordsChecks(url);
        suspicious += NoOfSubdomains(url);
        suspicious += shortenersURL(url);
        suspicious += mismatchedTopLevelDomain(url);
        return suspicious;
    }
    public int maliciousChecking(String url){
        int malicious = 0;
        malicious += ipAddressAsDomain(url);
        if(malicious==0){
            return 20;
        }
        return malicious;
    }
    public Map<String,String> isStatusOfUrl(String url){
        String mal = String.valueOf(maliciousChecking(url));
        String sus = String.valueOf(suspiciousChecking(url));
        String safe = String.valueOf(100-(Integer.parseInt(mal)+Integer.parseInt(sus)));
        URLHistoryEntity urlHistoryEntity = new URLHistoryEntity(url, LocalDate.now(),safe,sus,mal);
        return Map.of("mal",mal,
                "sus",sus,
                "safe",safe
        );
    }
}
