package com.DeepThreat.Service;

import com.DeepThreat.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService {
    @Autowired
    private UserRepository userRepository;
}
