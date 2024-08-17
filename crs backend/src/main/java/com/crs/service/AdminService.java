package com.crs.service;

import com.crs.dto.AdminDTO;

public interface AdminService {
    AdminDTO saveAdmin(AdminDTO adminDTO);
    AdminDTO login(String email, String password);
}
