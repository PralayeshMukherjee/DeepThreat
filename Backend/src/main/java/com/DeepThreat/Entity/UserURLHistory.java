package com.DeepThreat.Entity;

import jakarta.persistence.Entity;

import java.sql.Date;

@Entity
public class UserURLHistory {
    private String email;
    private String url;
    private Date date;
    private int malicious;
    private int Suspicious;
    private int safe;
}
