package com.DeepThreat.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpServiceForgotPassword {
    @Autowired
    private JavaMailSender javaMailSender;
    private static final int otpLenght = 6
}
