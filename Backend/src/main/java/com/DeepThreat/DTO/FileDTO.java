package com.DeepThreat.DTO;

import java.io.File;

public class FileDTO {
    private File file;

    public FileDTO() {
    }

    public FileDTO(File file) {
        this.file = file;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
