package com.crs.service.impl;

import com.crs.dao.AdminRepository;
import com.crs.dto.AdminDTO;
import com.crs.entities.Admin;
import com.crs.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public AdminDTO saveAdmin(AdminDTO adminDTO) {
        Admin admin = new Admin();
        admin.setAdminName(adminDTO.getAdminName());
        admin.setEmail(adminDTO.getEmail());
        admin.setContactNumber(adminDTO.getContactNumber());
        admin.setPassword(adminDTO.getPassword());
        Admin savedAdmin = adminRepository.save(admin);
        return convertToDTO(savedAdmin);
    }

    @Override
    public AdminDTO login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            return convertToDTO(admin);
        }
        return null;
    }

    private AdminDTO convertToDTO(Admin admin) {
        AdminDTO adminDTO = new AdminDTO();
        adminDTO.setId(admin.getId());
        adminDTO.setAdminName(admin.getAdminName());
        adminDTO.setEmail(admin.getEmail());
        adminDTO.setContactNumber(admin.getContactNumber());
        adminDTO.setPassword(admin.getPassword());
        return adminDTO;
    }
}
