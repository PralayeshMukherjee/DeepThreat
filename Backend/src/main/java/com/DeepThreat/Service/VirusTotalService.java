package com.DeepThreat.Service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class VirusTotalService {
    @Value("${virustotal.api.key}")
    private String apikey;
    @Value("${virustotal.api.url}")
    private String apiUrl;
    @Value("${virustotal.api.files}")
    private String apiURLForFiles;
    public int virusTotalCheck(String url){
        try{
            HttpClient client = HttpClient.newHttpClient();

            // Step 1: Submit the URL to VirusTotal
            String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
            HttpRequest submitRequest = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("x-apikey", apikey)
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString("url=" + encodedUrl))
                    .build();

            HttpResponse<String> submitResponse = client.send(submitRequest, HttpResponse.BodyHandlers.ofString());
            String analysisId = new JSONObject(submitResponse.body())
                    .getJSONObject("data")
                    .getString("id");

            // Step 2: Wait a bit and get analysis results
            Thread.sleep(3000); // wait 3 seconds

            HttpRequest resultRequest = HttpRequest.newBuilder()
                    .uri(URI.create("https://www.virustotal.com/api/v3/analyses/" + analysisId))
                    .header("x-apikey", apikey)
                    .build();

            HttpResponse<String> resultResponse = client.send(resultRequest, HttpResponse.BodyHandlers.ofString());
            JSONObject stats = new JSONObject(resultResponse.body())
                    .getJSONObject("data")
                    .getJSONObject("attributes")
                    .getJSONObject("stats");

            int malicious = stats.getInt("malicious");
            int suspicious = stats.getInt("suspicious");

            // Score calculation (max 15)
            int score = malicious * 5 + suspicious * 2;
            System.out.println(score);
            return Math.min(score, 15);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return 0;
    }
    private final WebClient webClient = WebClient.create();
    public void SendFiles(File file){
        webClient.post()
    }
}
