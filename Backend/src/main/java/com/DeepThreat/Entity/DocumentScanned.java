package com.DeepThreat.Entity;

import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.sql.Date;

@Entity
public class DocumentScanned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serialNo;
    @Column(name = "email",nullable = false)
    private String email;
    @Column(name = "date",nullable = false)
    private Date date;

    public DocumentScanned() {
    }

    public DocumentScanned(int serialNo, String email, Date date) {
        this.serialNo = serialNo;
        this.email = email;
        this.date = date;
    }
}
