package com.DeepThreat.Service;

import com.DeepThreat.Entity.DocumentScanned;
import com.DeepThreat.Repository.DocumentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;

@Service
public class FileScannerService {
    @Autowired
    private VirusTotalService virusTotalService;
    @Autowired
    private DocumentRepository documentRepository;
    public String checkFile(MultipartFile file,String email){
        try{
           String result = virusTotalService.checkFileStatus(file);
           if(result!=""){
               DocumentScanned documentScanned = new DocumentScanned();
               LocalDate localDate = LocalDate.now();
               Date date = Date.valueOf(localDate);
               documentScanned.setDate(date);
               documentScanned.setEmail(email);
               documentRepository.save(documentScanned);
           }
           return result;
        }catch (JsonProcessingException e){
            System.out.println(e.getMessage());
            return "error";
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
