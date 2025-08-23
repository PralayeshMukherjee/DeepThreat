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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getUrlSearched() {
        return urlSearched;
    }

    public void setUrlSearched(int urlSearched) {
        this.urlSearched = urlSearched;
    }

    public int getTotalDocumentScanned() {
        return totalDocumentScanned;
    }

    public void setTotalDocumentScanned(int totalDocumentScanned) {
        this.totalDocumentScanned = totalDocumentScanned;
    }

    public int getMaliciousUrlCount() {
        return maliciousUrlCount;
    }

    public void setMaliciousUrlCount(int maliciousUrlCount) {
        this.maliciousUrlCount = maliciousUrlCount;
    }

    public int getSuspiciousUrlCount() {
        return suspiciousUrlCount;
    }

    public void setSuspiciousUrlCount(int suspiciousUrlCount) {
        this.suspiciousUrlCount = suspiciousUrlCount;
    }

    public int getSafeUrlCount() {
        return safeUrlCount;
    }

    public void setSafeUrlCount(int safeUrlCount) {
        this.safeUrlCount = safeUrlCount;
    }
}
