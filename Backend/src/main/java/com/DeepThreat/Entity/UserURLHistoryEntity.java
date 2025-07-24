package com.DeepThreat.Entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class UserURLHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serialNo;
    @Column(name = "email")
    private String email;
    @Column(name = "url")
    private String url;
    @Column(name = "date")
    private Date date;
    @Column(name = "malicious")
    private int malicious;
    @Column(name = "Suspicious")
    private int Suspicious;
    @Column(name = "safe")
    private int safe;

    public UserURLHistoryEntity() {
    }

    public UserURLHistoryEntity(Long serialNo, String email, String url, Date date, int malicious, int suspicious, int safe) {
        this.serialNo = serialNo;
        this.email = email;
        this.url = url;
        this.date = date;
        this.malicious = malicious;
        Suspicious = suspicious;
        this.safe = safe;
    }

    public Long getSerialNo() {
        return serialNo;
    }

    public void setSerialNo(Long serialNo) {
        this.serialNo = serialNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getMalicious() {
        return malicious;
    }

    public void setMalicious(int malicious) {
        this.malicious = malicious;
    }

    public int getSuspicious() {
        return Suspicious;
    }

    public void setSuspicious(int suspicious) {
        Suspicious = suspicious;
    }

    public int getSafe() {
        return safe;
    }

    public void setSafe(int safe) {
        this.safe = safe;
    }
}
