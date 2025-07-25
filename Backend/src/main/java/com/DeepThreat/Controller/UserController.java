package com.DeepThreat.Controller;

import com.DeepThreat.Service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userDetails")
public class UserController {
    @Autowired
    private HistoryService historyService;
}
