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
}
