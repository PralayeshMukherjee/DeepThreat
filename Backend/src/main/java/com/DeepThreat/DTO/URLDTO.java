package com.DeepThreat.DTO;

public class URLDTO {
    private String url;
    private String email;

    public URLDTO() {
    }

    public URLDTO(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
