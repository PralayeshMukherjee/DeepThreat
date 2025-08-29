package com.DeepThreat.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class DocumentScanned {
    @Id
    private int serialNo;
}
