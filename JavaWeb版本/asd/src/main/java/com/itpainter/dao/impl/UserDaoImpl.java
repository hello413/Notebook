package com.itpainter.dao.impl;

import com.itpainter.dao.UserDao;
import com.itpainter.domain.User;
import com.itpainter.util.JDBCUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class UserDaoImpl implements UserDao {
    private JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    @Override
    public User findByUsername(String username) {
        User user = null;
        try {
            //1.定义sql
            String sql = "select * from user where username = ?";
            //2.执行sql
            user = template.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), username);
        } catch (Exception e) {

        }
        return user;
    }

    @Override
    public User findByTelephone(String telephone) {
        User user = null;
        try {
            //1.定义sql
            String sql = "select * from user where telephone = ?";
            //2.执行sql
            user = template.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), telephone);
        } catch (Exception e) {

        }
        return user;
    }
    @Override
    public void save(User user) {
        //1.定义sql
        String sql = "insert into user(username,password,sex,telephone,email,status,code) values(?,?,?,?,?,?,?)";
        //2.执行sql

        template.update(sql, user.getUsername(),
                user.getPassword(),
                user.getSex(),
                user.getTelephone(),
                user.getEmail(),
                user.getStatus(),
                user.getCode()
        );
    }
    /**
     * 根据激活码查询用户对象
     * @param code
     * @return
     */
    @Override
    public User findByCode(String code) {
        User user = null;
        try {
            String sql = "select * from user where code = ?";

            user = template.queryForObject(sql,new BeanPropertyRowMapper<User>(User.class),code);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }

        return user;
    }

    /**
     * 修改指定用户激活状态
     * @param user
     */
    @Override
    public void updateStatus(User user) {
        String sql = " update user set status = 'T' where username=?";
        template.update(sql,user.getUsername());
    }

    /**
     * 根据用户名和密码查询的方法
     * @param telephone
     * @param password
     * @return
     */
    @Override
    public User findByTelephoneAndPassword(String telephone, String password) {
        User user = null;
        try {
            //1.定义sql
            String sql = "select * from user where telephone = ? and password = ?";
            //2.执行sql
            user = template.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), telephone,password);
        } catch (Exception e) {

        }
        return user;
    }
}
