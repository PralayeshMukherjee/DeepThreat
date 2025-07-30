package com.DeepThreat.Controller;

import com.DeepThreat.DTO.UserDetailsUpdateDto;
import com.DeepThreat.Entity.UserEntity;
import com.DeepThreat.Entity.UserURLHistoryEntity;
import com.DeepThreat.Service.HistoryService;
import com.DeepThreat.Service.OtpServiceForgotPassword;
import com.DeepThreat.Service.UserDetailsService;
import com.DeepThreat.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/userDetails")
public class UserController {
    @Autowired
    private HistoryService historyService;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private OtpServiceForgotPassword otpServiceForgotPassword;
    @PostMapping("/urlHistory")
    public ResponseEntity<List<UserURLHistoryEntity>> urlHistory(@RequestParam String email){
        List<UserURLHistoryEntity> list =  historyService.urlSearchedHistory(email);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/getUser")
    public ResponseEntity<UserEntity> getUserDetails(@RequestParam String email){
        UserEntity userEntity = userDetailsService.getUserAllDetails(email);
        return ResponseEntity.ok(userEntity);
    }
    @PutMapping("/updateData")
    public ResponseEntity<UserEntity> saveUserDetails(@RequestBody UserDetailsUpdateDto userDetailsUpdateDto){
        String email = userDetailsUpdateDto.getEmail();
        String name = userDetailsUpdateDto.getName();
        String phone = userDetailsUpdateDto.getPhone();
        UserEntity updateEntity = userDetailsService.saveUserAllDetails(email,name,phone);
        return ResponseEntity.ok(updateEntity);
    }
    @PostMapping("/sendOTPtoForgot")
    public ResponseEntity<Map<String,String>> otpSendForForgotPassword(@RequestParam String email){
        boolean isOtpGenerated = otpServiceForgotPassword.generateOTP(email);
        boolean isOTPSend = false;
        if(isOtpGenerated){
            isOTPSend = otpServiceForgotPassword.sendOTPToEmail(email);
        }
        return ResponseEntity.ok(Map.of("isOTPSend",String.valueOf(isOTPSend)));
    }
    public ResponseEntity<Map<String,String>> verifyOTP(@RequestParam String email,String otp,String newPassword){
        String result = otpServiceForgotPassword.verifyOTP(email, otp, newPassword);
    }
}
