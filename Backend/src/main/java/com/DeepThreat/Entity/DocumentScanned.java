package com.DeepThreat.Entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class DocumentScanned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serialNo;
    @Column(name = "email",nullable = false)
    private String email;
    @Column(name = "date",nullable = false)
    private Date date;

    public DocumentScanned() {
    }

    public DocumentScanned(String email, Date date) {
        this.email = email;
        this.date = date;
    }

    public long getSerialNo() {

        return serialNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
