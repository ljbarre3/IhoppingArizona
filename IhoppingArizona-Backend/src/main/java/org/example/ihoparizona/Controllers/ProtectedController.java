package org.example.ihoparizona.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProtectedController {

    @GetMapping("/public")
    public String publicEndpoint() {
        System.out.println("Public Endpoint Accessed");
        return "This is a public endpoint";
    }

    @GetMapping("/admin")
    public String adminEndpoint() {
        System.out.println("Admin Endpoint Accessed");
        return "You are authenticated!";
    }
}
