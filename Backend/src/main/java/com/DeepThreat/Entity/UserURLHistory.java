package com.DeepThreat.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class UserURLHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serialNo;
    private String email;
    private String url;
    private Date date;
    private int malicious;
    private int Suspicious;
    private int safe;
}
