package com.crs.service;

import com.crs.dto.UserDTO;
import com.crs.entities.User;

public interface UserService {

    User register(UserDTO userDTO);
    User login(String email, String password);
    User findByEmail(String email);
    UserDTO getUserById(Long userId);
}
