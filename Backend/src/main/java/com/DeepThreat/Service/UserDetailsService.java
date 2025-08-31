package com.DeepThreat.Service;

import com.DeepThreat.DTO.UserAllDetailsDTO;
import com.DeepThreat.Entity.DocumentScanned;
import com.DeepThreat.Entity.UserEntity;
import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Repository.DocumentRepository;
import com.DeepThreat.Repository.UserRepository;
import com.DeepThreat.Repository.UserURLHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserURLHistoryRepository userURLHistoryRepository;
    @Autowired
    private DocumentRepository documentRepository;
    public UserEntity getUserAllDetails(String email){
        UserEntity userEntity = new UserEntity();
        try{
             Optional<UserEntity> userEntity1 = userRepository.findById(email);
             if(userEntity1.isPresent()){
                 userEntity = userEntity1.get();
                 userEntity.setPassword("");
             }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return userEntity;
    }
    public UserEntity saveUserAllDetails(String email,String name,String phone){
        UserEntity afterUpdation = null;
        try{
            Optional<UserEntity> userEntity1 = userRepository.findById(email);
            if(userEntity1.isPresent()){
                UserEntity userEntity = userEntity1.get();
                userEntity.setName(name);
                userEntity.setPhone(phone);
                userRepository.save(userEntity);
                afterUpdation = userEntity;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return afterUpdation;
    }
    public UserAllDetailsDTO getUserIndepthDetails(String email){
        UserEntity userEntity = getUserAllDetails(email);
        UserAllDetailsDTO detailsDTO = new UserAllDetailsDTO();
        detailsDTO.setName(userEntity.getName());
        detailsDTO.setPhone(userEntity.getPhone());
        detailsDTO.setEmail(email);
        try{
            List<UserURLHistoryEntity> list = userURLHistoryRepository.findByEmail(email);
            int countUrlSearched = list.size(), countMaliciousUrl=0, countSuspiciousUrl = 0, countSafeUrl=0;
            for (UserURLHistoryEntity userURLHistoryEntity : list) {
                if (userURLHistoryEntity.getMalicious() >= 10) {
                    countMaliciousUrl++;
                } else if (userURLHistoryEntity.getSuspicious() >= 20) {
                    countSuspiciousUrl++;
                } else {
                    countSafeUrl++;
                }
            }
            detailsDTO.setUrlSearched(countUrlSearched);
            detailsDTO.setMaliciousUrlCount(countMaliciousUrl);
            detailsDTO.setSuspiciousUrlCount(countSuspiciousUrl);
            detailsDTO.setSafeUrlCount(countSafeUrl);
            detailsDTO.setTotalDocumentScanned(0);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        int totalDocScanned = documentRepository.countTotalDocumentScanned(email);
        return detailsDTO;
    }
}
