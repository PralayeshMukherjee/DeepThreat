package com.DeepThreat.Service;

import com.DeepThreat.Entity.URLHistoryEntity;
import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Repository.URLHistoryRepository;
import com.DeepThreat.Repository.UserURLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

//login, account, verify, update, secure, bank, free, gift, c
@Service
public class URLScanningService {
    @Autowired
    private URLHistoryRepository urlHistoryRepository;
    @Autowired
    private URLAPIChecking urlapiChecking;
    @Autowired
    private UserURLHistoryRepository userURLHistoryRepository;
    @Autowired
    private VirusTotalService virusTotalService;
    public int suspiciousKeywordsChecks(String url){
        if(url.contains("login")||url.contains("account")||url.contains("verify")||url.contains("update")||url.contains("secure")||url.contains("bank")||url.contains("free")||url.contains("gift")||url.contains("prize")){
            return 10;
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
            return 5;
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
                return 5;
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
                return 5;
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
                return 5;
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return 0;
    }
    public int urlLengthCheck(String url){
        if(url.length()>75) return 10;
        return 0;
    }
    public int hasAnySymbol(String url){
        if (url.contains("@")) return 10;
        return 0;
    }
    public int suspiciousCharsCount(String url){
        int count = 0;
        for(char ch:url.toCharArray()){
            if("-=@%$&!*".indexOf(ch)!=-1) count++;
        }
        return count > 5 ? 10 : 0;
    }
    public int isHttpProtocol(String url){
        if(url.toLowerCase().startsWith("http://")) return 10;
        return 0;
    }
    public int suspiciousChecking(String url){
        int suspicious = 0;
        suspicious += suspiciousKeywordsChecks(url);
        suspicious += NoOfSubdomains(url);
        suspicious += shortenersURL(url);
        suspicious += mismatchedTopLevelDomain(url);
        suspicious += mismatchedTopLevelDomain(url);
        suspicious += urlLengthCheck(url);
        suspicious += hasAnySymbol(url);
        suspicious += suspiciousCharsCount(url);
        suspicious += isHttpProtocol(url);
        return Math.min(suspicious,40);
    }
    public int maliciousChecking(String url){
        int malicious = 0;
        malicious += ipAddressAsDomain(url);
        if(urlapiChecking.isGoogleSafeBrowsing(url)){
            malicious+=10;
        }
        malicious += virusTotalService.virusTotalCheck(url);
        return Math.min(malicious,40);
    }
    public Map<String,String> isStatusOfUrl(String url,String email){
        int mal = maliciousChecking(url);
        int sus = suspiciousChecking(url);
        int safe = 100-mal-sus;
        try{
            LocalDate localDate = LocalDate.now();
            Date date = Date.valueOf(localDate);
            URLHistoryEntity urlHistoryEntity = new URLHistoryEntity(url,date,safe,sus,mal);
            urlHistoryRepository.save(urlHistoryEntity);
            UserURLHistoryEntity userURLHistoryEntity = new UserURLHistoryEntity(email,url,date,mal,sus,safe);
            userURLHistoryRepository.save(userURLHistoryEntity);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return Map.of("mal",String.valueOf(mal),
                "sus",String.valueOf(sus),
                "safe",String.valueOf(safe)
        );
    }
}
