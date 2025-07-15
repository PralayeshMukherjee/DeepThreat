package com.DeepThreat.Service;

import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Set;

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
            return 2;
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
                return 2;
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
                return 1;
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
                return 1;
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
        return 0;
    }
    public int finalPointStable(String url){
        int pointCheck = 0;
        pointCheck += suspiciousKeywordsChecks(url);
        pointCheck += shortenersURL(url);
        pointCheck += ipAddressAsDomain(url);
        pointCheck += NoOfSubdomains(url);
        pointCheck += mismatchedTopLevelDomain(url);
        return pointCheck;
    }
    public String domainChecker(String url){
        int urlCheckingProcedure = finalPointStable(url);
    }
}
