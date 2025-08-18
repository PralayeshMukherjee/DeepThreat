package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileScannerService {
    @Autowired
    private VirusTotalService virusTotalService;
}
