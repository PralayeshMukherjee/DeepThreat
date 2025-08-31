package com.DeepThreat.DTO;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class FileDTO {
    private MultipartFile file;
    private String email;

    public FileDTO() {
    }

    public FileDTO(MultipartFile file, String email) {
        this.file = file;
        this.email = email;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
