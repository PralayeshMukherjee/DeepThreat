package com.DeepThreat.DTO;

public class UserPastData {
    private String url;
    private int malicious;
    private int suspicious;
    private int safe;

    public UserPastData() {
    }

    public UserPastData(String url, int malicious, int suspicious, int safe) {
        this.url = url;
        this.malicious = malicious;
        this.suspicious = suspicious;
        this.safe = safe;
    }
}
