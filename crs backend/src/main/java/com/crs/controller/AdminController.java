package com.crs.controller;

import com.crs.dto.AdminDTO;
import com.crs.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @GetMapping("/test")
    public String test() {
    	return "Welcome to backend api of crs";
    }
    
    @PostMapping("/save")
    public ResponseEntity<AdminDTO> saveAdmin(@RequestBody AdminDTO adminDTO) {
        AdminDTO savedAdmin = adminService.saveAdmin(adminDTO);
        return ResponseEntity.ok(savedAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<AdminDTO> login(@RequestParam String email, @RequestParam String password) {
        AdminDTO adminDTO = adminService.login(email, password);
        if (adminDTO != null) {
            return ResponseEntity.ok(adminDTO);
        }
        return ResponseEntity.status(401).body(null);
    }
}
