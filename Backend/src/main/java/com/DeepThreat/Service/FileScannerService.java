package com.DeepThreat.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileScannerService {
    @Autowired
    private VirusTotalService virusTotalService;
    public String checkFile(MultipartFile file,String email){
        try{
           return virusTotalService.checkFileStatus(file);
        }catch (JsonProcessingException e){
            System.out.println(e.getMessage());
            return "error";
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
