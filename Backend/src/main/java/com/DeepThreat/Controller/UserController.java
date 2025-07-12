package com.DeepThreat.Controller;

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
        return Map.of("isVerfied",isVerified);
    }
    @PostMapping("/success")
    public Map<String,Boolean> successFullyRegister(@RequestBody AddUser addUser){
        String name = addUser.getName();
        String emailId = addUser.getEmailId();
        String password = addUser.getPassword();
        boolean isSuccessfullyRegister = userService.successRegister(name,emailId,password);
        return Map.of("isSuccessfullyRegister",isSuccessfullyRegister);
    }
    @PostMapping("/login")
    public Map<String,String> LoginUser(@RequestParam String emailId, String password){
        String result = userService.SuccessfullyLogin(emailId,password);
        return Map.of("result",result);
    }
}
