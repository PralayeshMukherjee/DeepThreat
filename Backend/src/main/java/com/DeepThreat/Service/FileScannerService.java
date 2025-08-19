package com.DeepThreat.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class FileScannerService {
    @Autowired
    private VirusTotalService virusTotalService;
    public String checkFile(File file){
        try{
           return virusTotalService.checkFileStatus(file);
        }catch (JsonProcessingException e){
            System.out.println(e.getMessage());
            return "error";
        }
    }
}
