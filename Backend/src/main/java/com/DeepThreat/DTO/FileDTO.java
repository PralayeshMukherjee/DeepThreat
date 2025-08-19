package com.DeepThreat.DTO;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class FileDTO {
    private MultipartFile file;

    public FileDTO() {
    }

    public FileDTO(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
