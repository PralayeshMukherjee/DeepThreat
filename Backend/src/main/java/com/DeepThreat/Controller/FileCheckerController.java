package com.DeepThreat.Controller;

import com.DeepThreat.DTO.FileDTO;
import com.DeepThreat.Service.FileScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/fileScanning")
public class FileCheckerController {
    @Autowired
    private FileScannerService fileScannerService;
    @PostMapping("/check")
    public ResponseEntity<Map<String,String>> FileScan(FileDTO fileDTO){
        MultipartFile file = fileDTO.getFile();
        String email = fileDTO.getEmail();
        String fileSafetyCheck = fileScannerService.checkFile(file);
        return ResponseEntity.ok(Map.of("fileStatus",fileSafetyCheck));
    }
}
