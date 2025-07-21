package com.DeepThreat.Service;

import com.DeepThreat.Entity.URLHistoryEntity;
import com.DeepThreat.Repository.URLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ThreatDetection {
    @Autowired
    private URLHistoryRepository urlHistoryRepository;
    public int isThreatDetect(String url){
        try{
            List<URLHistoryEntity> urlHistoryEntity = urlHistoryRepository.findByUrl(url);
            int count = 0;
            for (URLHistoryEntity entity : urlHistoryEntity) {
                if (entity.getMalicious() >= 30) {
                    count++;
                } else if (entity.getSuspicious() >= 40) {
                    count++;
                }
            }
            return count;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return 0;
        }
    }
}
