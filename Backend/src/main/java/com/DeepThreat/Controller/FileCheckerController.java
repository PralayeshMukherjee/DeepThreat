package com.DeepThreat.Controller;

import com.DeepThreat.DTO.FileDTO;
import com.DeepThreat.Service.FileScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/fileScanning")
public class FileCheckerController {
    @Autowired
    private FileScannerService fileScannerService;
    public ResponseEntity<Map<String,String>> FileScan(FileDTO fileDTO){
        File file = fileDTO.getFile();
        String fileSafetyCheck = fileScannerService.checkFile(file);
    }
}
