package com.itpainter.domain;

import java.io.Serializable;

/**
 * 用户实体类
 */
public class User implements Serializable {
    private int u_id;//用户id
    private String username;//用户名，账号
    private String telephone;//手机号
    private String password;//密码
    private String sex;//男或女
    private String email;//邮箱
    private String status;//激活状态，T代表激活，F代表未激活
    private String code;//激活码（要求唯一）

    /**
     * 无参构造方法
     */
    public User() {
    }

    public User(int u_id, String username, String telephone, String password, String sex, String email, String status, String code) {
        this.u_id = u_id;
        this.username = username;
        this.telephone = telephone;
        this.password = password;
        this.sex = sex;
        this.email = email;
        this.status = status;
        this.code = code;
    }

    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
