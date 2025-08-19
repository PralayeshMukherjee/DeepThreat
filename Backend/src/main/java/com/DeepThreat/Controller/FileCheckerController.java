package com.DeepThreat.Controller;

import com.DeepThreat.DTO.FileDTO;
import com.DeepThreat.Service.FileScannerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/fileScanning")
public class FileCheckerController {
    private FileScannerService fileScannerService;
    public ResponseEntity<Map<String,String>> FileScan(FileDTO fileDTO){
        File file = fileDTO.getFile();

    }
}
