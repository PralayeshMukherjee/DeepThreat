package com.DeepThreat.Service;

import com.DeepThreat.Repository.URLHistoryRepository;
import com.DeepThreat.Repository.UserURLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {
    @Autowired
    private UserURLHistoryRepository userURLHistoryRepository;
    public void urlSearchedHistory(String email){

    }
}
