package com.DeepThreat.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Date;

@Entity
@Table(name = "urlhistor")
public class URLHistory {
    @Id
    private Long serialNo;
    private String url;
    private Date date;
    private int safe;
    private int suspicious;
    private int malicious;
}
