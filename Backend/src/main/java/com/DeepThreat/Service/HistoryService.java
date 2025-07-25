package com.DeepThreat.Service;

import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Repository.URLHistoryRepository;
import com.DeepThreat.Repository.UserURLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HistoryService {
    @Autowired
    private UserURLHistoryRepository userURLHistoryRepository;
    public List<UserURLHistoryEntity> urlSearchedHistory(String email){
        List<UserURLHistoryEntity> list;
        try{
            list = userURLHistoryRepository.findAll();
        }catch (Exception e){
            System.out.println(e.getMessage());
            list = new ArrayList<>();
        }
        return list;
    }
}
