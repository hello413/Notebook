package com.itpainter.service;

import com.itpainter.domain.User;

public interface UserService {
    int regist(User user);
    boolean active(String code);

    User login(User user);
}
