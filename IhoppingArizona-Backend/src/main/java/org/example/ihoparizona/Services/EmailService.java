package org.example.ihoparizona.Services;

import org.example.ihoparizona.Repositories.IhopLocationRepository;
import org.example.ihoparizona.dto.ContactDTO;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(ContactDTO contact) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("Barrettlevi28@gmail.com");
        message.setSubject("IHOP Contact: " + contact.getFirstName() + " " + contact.getLastName());

        String content = String.format("""
                You recieved a new message from the Ihopping Arizona Contact Form:
                
                Name: %s %s
                Email: %s
                Message:
                
                %s
                """,
                contact.getFirstName(),
                contact.getLastName(),
                contact.getEmail(),
                contact.getFeedback()
        );

        message.setText(content);
        mailSender.send(message);
    }


}
