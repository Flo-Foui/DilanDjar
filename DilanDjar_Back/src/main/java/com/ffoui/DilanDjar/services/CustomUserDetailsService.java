package com.ffoui.DilanDjar.services;

import com.ffoui.DilanDjar.daos.UserDao;
import com.ffoui.DilanDjar.entities.CustomUserDetails;
import com.ffoui.DilanDjar.entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserDao userDao;

    public CustomUserDetailsService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.getUserByEmail(username);
        return new CustomUserDetails(user);
    }
}
