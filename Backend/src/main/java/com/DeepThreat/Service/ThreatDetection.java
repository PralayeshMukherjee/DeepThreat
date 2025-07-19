package com.DeepThreat.Service;

import com.DeepThreat.Entity.URLHistoryEntity;
import com.DeepThreat.Repository.URLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class ThreatDetection {
    @Autowired
    private URLHistoryRepository urlHistoryRepository;
    public Map<String,String> isThreatDetect(String url){
        Optional<URLHistoryEntity> uhe = urlHistoryRepository.findByURL(url);
    }
}
