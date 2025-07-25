package com.DeepThreat.Controller;

import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userDetails")
public class UserController {
    @Autowired
    private HistoryService historyService;
    @PostMapping("/urlHistory")
    public ResponseEntity<List<UserURLHistoryEntity>> urlHistory(@RequestParam String email){
        List<UserURLHistoryEntity> list =  historyService.urlSearchedHistory(email);
        return ResponseEntity.ok(list);
    }
}
