package com.DeepThreat.Service;

import com.DeepThreat.Repository.URLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {
    @Autowired
    private URLHistoryRepository urlHistoryRepository;
}
