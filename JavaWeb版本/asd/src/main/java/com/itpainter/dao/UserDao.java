package com.itpainter.dao;

import com.itpainter.domain.User;

public interface UserDao {
    /**
     * 根据用户名查询用户信息
     * @param username
     * @return
     */
    public User findByUsername(String username);
    /**
     * 根据手机号查询用户信息
     * @param telephone
     * @return
     */
    public User findByTelephone(String telephone);

    /**
     * 用户保存
     * @param user
     */
    public void save(User user);

    User findByCode(String code);

    void updateStatus(User user);

    User findByTelephoneAndPassword(String telephone, String password);
}
