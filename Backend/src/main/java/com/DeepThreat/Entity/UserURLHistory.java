package com.DeepThreat.Entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class UserURLHistory {
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

    public UserURLHistory() {
    }

    public UserURLHistory(Long serialNo, String email, String url, Date date, int malicious, int suspicious, int safe) {
        this.serialNo = serialNo;
        this.email = email;
        this.url = url;
        this.date = date;
        this.malicious = malicious;
        Suspicious = suspicious;
        this.safe = safe;
    }
}
