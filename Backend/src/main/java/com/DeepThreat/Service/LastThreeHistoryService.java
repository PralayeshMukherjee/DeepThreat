package com.DeepThreat.Service;

import com.DeepThreat.Repository.UserURLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LastThreeHistoryService {
    @Autowired
    private UserURLHistoryRepository userURLHistoryRepository;
}
