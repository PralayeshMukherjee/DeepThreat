package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OtpServiceForgotPassword {
    @Autowired
    private JavaMailSender javaMailSender;
    private static final int otpLenght = 6;
    private Map<String,String > otpMapping = new HashMap<>();
}
