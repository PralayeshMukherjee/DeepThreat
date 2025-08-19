package com.DeepThreat.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileScannerService {
    @Autowired
    private VirusTotalService virusTotalService;
    public String checkFile(File file) throws JsonProcessingException {
        return virusTotalService.checkFileStatus(file);
    }
}
