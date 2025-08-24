package com.DeepThreat.Service;

import com.DeepThreat.DTO.UserAllDetailsDTO;
import com.DeepThreat.Entity.UserEntity;
import com.DeepThreat.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsService {
    @Autowired
    private UserRepository userRepository;
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

    }
}
