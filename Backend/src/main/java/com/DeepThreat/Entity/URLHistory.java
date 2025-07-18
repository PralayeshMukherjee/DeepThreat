package com.DeepThreat.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name = "urlhistor")
public class URLHistory {
    @Id
    private Long serialNo;
    @Column(name = "url")
    private String url;
    @Column(name = "date")
    private Date date;
    @Column(name = "safe")
    private int safe;
    @Column(name = "suspicious")
    private int suspicious;
    @Column(name = "suspicious")
    private int malicious;

    public URLHistory() {
    }

    public URLHistory(Long serialNo, String url, Date date, int safe, int suspicious, int malicious) {
        this.serialNo = serialNo;
        this.url = url;
        this.date = date;
        this.safe = safe;
        this.suspicious = suspicious;
        this.malicious = malicious;
    }
}
