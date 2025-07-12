package com.DeepThreat.Controller;

import com.DeepThreat.Authentication.JwtUtil;
import com.DeepThreat.DTO.AddUser;
import com.DeepThreat.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/signup")
    public Map<String,Boolean> addNewUser(@RequestBody AddUser addUser){
        String name = addUser.getName().trim();
        String emailId = addUser.getEmailId().trim();
        String password = addUser.getPassword().trim();
        boolean isGenerated = userService.generateOTP(emailId);
        boolean isSend = false;
        if(isGenerated){
            isSend = userService.sendOTPToEmail(name,emailId);
        }
        return Map.of("isSend",isSend);
    }
    @PostMapping("/verifyOtp")
    public Map<String,Boolean> verifyTheOTP(@RequestParam String otp, String emailId, String name){
        boolean isVerified = userService.verifyOTP(emailId,otp);
        return Map.of("isVerified",isVerified);
    }
    @PostMapping("/success")
    public Map<String,String> successFullyRegister(@RequestBody AddUser addUser){
        String name = addUser.getName();
        String emailId = addUser.getEmailId();
        String password = addUser.getPassword();
        boolean isSuccessfullyRegister = userService.successRegister(name,emailId,password);
        if (!isSuccessfullyRegister) {
            return Map.of("isSuccessfullyRegister", "false");
        }
        String token = jwtUtil.generateTokenManually(emailId,name);
        return Map.of("isSuccessfullyRegister","true",
                "token", token
        );
    }
    @PostMapping("/login")
    public Map<String,String> LoginUser(@RequestParam String emailId, String password){
        String result = userService.SuccessfullyLogin(emailId,password);
        return Map.of("result",result);
    }
}
