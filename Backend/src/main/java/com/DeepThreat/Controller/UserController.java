package com.DeepThreat.Controller;

import com.DeepThreat.Service.HistoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userDetails")
public class UserController {
    private HistoryService historyService;
}
