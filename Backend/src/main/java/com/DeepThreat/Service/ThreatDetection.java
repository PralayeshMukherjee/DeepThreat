package com.DeepThreat.Service;

import com.DeepThreat.Entity.URLHistoryEntity;
import com.DeepThreat.Repository.URLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ThreatDetection {
    @Autowired
    private URLHistoryRepository urlHistoryRepository;
    public Map<String,String> isThreatDetect(String url){
        List<URLHistoryEntity> urlHistoryEntity = urlHistoryRepository.findByURL(url);
        int count = 0;
        for (URLHistoryEntity entity : urlHistoryEntity) {
            if (entity.getMalicious() >= 30) {
                count++;
            } else if (entity.getSuspicious() >= 40) {
                count++;
            }
        }
    }
}
