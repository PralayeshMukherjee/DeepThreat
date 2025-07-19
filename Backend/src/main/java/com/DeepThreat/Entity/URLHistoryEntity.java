package com.DeepThreat.Entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "urlhistor")
public class URLHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serialNo;
    @Column(name = "url")
    private String url;
    @Column(name = "date")
    private Date date;
    @Column(name = "safe")
    private int safe;
    @Column(name = "suspicious")
    private int suspicious;
    @Column(name = "malicious")
    private int malicious;

    public URLHistoryEntity() {
    }

    public URLHistoryEntity(String url, Date date, int safe, int suspicious, int malicious) {
        this.serialNo = serialNo;
        this.url = url;
        this.date = date;
        this.safe = safe;
        this.suspicious = suspicious;
        this.malicious = malicious;
    }

    public Long getSerialNo() {
        return serialNo;
    }

    public void setSerialNo(Long serialNo) {
        this.serialNo = serialNo;
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

    public int getSafe() {
        return safe;
    }

    public void setSafe(int safe) {
        this.safe = safe;
    }

    public int getSuspicious() {
        return suspicious;
    }

    public void setSuspicious(int suspicious) {
        this.suspicious = suspicious;
    }

    public int getMalicious() {
        return malicious;
    }

    public void setMalicious(int malicious) {
        this.malicious = malicious;
    }
}
