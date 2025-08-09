package com.DeepThreat.Controller;

import com.DeepThreat.Service.LastThreeHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LastThreeData {
    @Autowired
    private LastThreeHistoryService lastThreeHistoryService;
}
