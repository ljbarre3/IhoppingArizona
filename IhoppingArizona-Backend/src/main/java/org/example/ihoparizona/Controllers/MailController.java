package org.example.ihoparizona.Controllers;

import jakarta.validation.Valid;
import org.example.ihoparizona.Services.EmailService;
import org.example.ihoparizona.dto.ContactDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class MailController {

    private final EmailService emailService;

    MailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/submit")
    public ResponseEntity<?> handleContactForm(@Valid @RequestBody ContactDTO contactDTO) {
        emailService.sendEmail(contactDTO);
        return ResponseEntity.ok().build();
    }
}
