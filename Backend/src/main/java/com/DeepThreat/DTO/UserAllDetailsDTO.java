package com.DeepThreat.DTO;

public class UserAllDetailsDTO {
    private String name;
    private String email;
    private String phone;
    private int urlSearched;
    private int totalDocumentScanned;
    private int maliciousUrlCount;
    private int suspiciousUrlCount;
    private int safeUrlCount;

    public UserAllDetailsDTO() {
    }

    public UserAllDetailsDTO(String name, String email, String phone, int urlSearched, int totalDocumentScanned, int maliciousUrlCount, int suspiciousUrlCount, int safeUrlCount) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.urlSearched = urlSearched;
        this.totalDocumentScanned = totalDocumentScanned;
        this.maliciousUrlCount = maliciousUrlCount;
        this.suspiciousUrlCount = suspiciousUrlCount;
        this.safeUrlCount = safeUrlCount;
    }
}
