package com.DeepThreat.Service;

import com.DeepThreat.DTO.UserPastData;
import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Repository.UserURLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LastThreeHistoryService {
    @Autowired
    private UserURLHistoryRepository userURLHistoryRepository;
    public List<UserPastData> getLastThreeHistory(String email){
        List<UserURLHistoryEntity> getDataFromDataBase = userURLHistoryRepository.findLastThreeURL(email);
        List<UserPastData> fianlList = new ArrayList<>();
        for(UserURLHistoryEntity userUrl:getDataFromDataBase){

        }
    }
}
