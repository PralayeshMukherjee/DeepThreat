package com.DeepThreat.DTO;

public class UserDetailsUpdateDto {
    private String name;
    private String email;
    private String phone;

    public UserDetailsUpdateDto() {
    }

    public UserDetailsUpdateDto(String name, String email, String phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
