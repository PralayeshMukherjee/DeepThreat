package com.DeepThreat.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class DocumentScanned {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serialNo;
    private String email;
}
