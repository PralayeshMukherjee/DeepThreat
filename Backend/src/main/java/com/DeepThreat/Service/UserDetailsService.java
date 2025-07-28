package com.DeepThreat.Service;

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
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
