package com.crs.service.impl;

import com.crs.dto.AddressDTO;
import com.crs.dto.UserDTO;
import com.crs.entities.Address;
import com.crs.entities.User;
import com.crs.dao.UserRepository;
import com.crs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

//    @Override
//    public User register(UserDTO userDTO) {
//        User user = new User();
//        user.setUserName(userDTO.getName());
//        user.setAdharCardNumber(userDTO.getAdharCardNumber());
//        user.setEmail(userDTO.getEmail());
//        user.setContactNumber(userDTO.getContactNumber());
////        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
//        user.setAddress(userDTO.getAddress());
//        return userRepository.save(user);
//    }
    
    @Override
    public User register(UserDTO userDTO) {
        User user = new User();
        user.setUserName(userDTO.getUserName());
        user.setAdharCardNumber(userDTO.getAdharCardNumber());
        user.setEmail(userDTO.getEmail());
        user.setContactNumber(userDTO.getContactNumber());
//        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPassword(userDTO.getPassword());
        user.setAddress(convertToAddress(userDTO.getAddress()));
        return userRepository.save(user);
    }


    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
//        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
        if (user != null && password.equals(user.getPassword())){    
        	return user;
        }
        return null;
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(user.getUserName());
        userDTO.setAdharCardNumber(user.getAdharCardNumber());
        userDTO.setEmail(user.getEmail());
        userDTO.setContactNumber(user.getContactNumber());
        userDTO.setPassword(user.getPassword());

        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setAddressLine1(user.getAddress().getAddressLine1());
        addressDTO.setAddressLine2(user.getAddress().getAddressLine2());
        addressDTO.setCity(user.getAddress().getCity());
        addressDTO.setState(user.getAddress().getState());
        addressDTO.setPincode(user.getAddress().getPincode());

        userDTO.setAddress(addressDTO);
        return userDTO;
    }
    
    private Address convertToAddress(AddressDTO addressDTO) {
        Address address = new Address();
        address.setAddressLine1(addressDTO.getAddressLine1());
        address.setAddressLine2(addressDTO.getAddressLine2());
        address.setState(addressDTO.getState());
        address.setCity(addressDTO.getCity());
        address.setPincode(addressDTO.getPincode());
        return address;
    }

}
