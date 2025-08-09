package com.DeepThreat.Controller;

import com.DeepThreat.DTO.UserPastData;
import com.DeepThreat.Service.LastThreeHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class LastThreeData {
    @Autowired
    private LastThreeHistoryService lastThreeHistoryService;
    public ResponseEntity<List<UserPastData>> lastThreeDatas(@RequestParam String email){

    }
}
