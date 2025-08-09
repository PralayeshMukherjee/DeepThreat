package com.DeepThreat.Controller;

import com.DeepThreat.Service.LastThreeHistoryService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LastThreeData {
    private LastThreeHistoryService lastThreeHistoryService;
}
