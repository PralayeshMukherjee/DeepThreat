package com.DeepThreat.Controller;

import com.DeepThreat.DTO.FileDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/fileScanning")
public class FileCheckerController {
    public ResponseEntity<Map<String,String>> FileScan(FileDTO fileDTO){
    }
}
