package com.DeepThreat.DTO;

public class URLDTO {
    private String url;
    private String email;

    public URLDTO() {
    }

    public URLDTO(String url,String email) {
        this.url = url;
        this.email = email;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
