package com.itpainter.service.impl;

import com.itpainter.dao.UserDao;
import com.itpainter.dao.impl.UserDaoImpl;
import com.itpainter.domain.User;
import com.itpainter.service.UserService;
import com.itpainter.util.MailUtils;
import com.itpainter.util.UuidUtil;

public class UserServiceImpl implements UserService {
    private UserDao userDao = new UserDaoImpl();
    /**
     * 注册用户
     * @param user
     * @return
     */
    @Override
    public int regist(User user) {
        //1.根据用户名查询用户对象
        User u = userDao.findByUsername(user.getUsername());
        User s = userDao.findByTelephone(user.getTelephone());
        //判断u是否为null
        if(u != null){
            //用户名存在，注册失败
            return 1;
        }
        if(s!=null){
            //用户名存在，注册失败
            return 2;
        }
        //2.保存用户信息
        //2.1设置激活码，唯一字符串
        user.setCode(UuidUtil.getUuid());
        //2.2设置激活状态
        user.setStatus("F");
        userDao.save(user);

        //3.激活邮件发送，邮件正文？

        String content="<a href='http://localhost:8082/travel/user/active?code="+user.getCode()+"'>点击激活【413部队】</a>";

        MailUtils.sendMail(user.getEmail(),content,"激活邮件");

        return 0;
    }
    /**
     * 激活用户
     * @param code
     * @return
     */
    @Override
    public boolean active(String code) {
        //1.根据激活码查询用户对象
        User user = userDao.findByCode(code);
        if(user != null){
            //2.调用dao的修改激活状态的方法
            userDao.updateStatus(user);
            return true;
        }else{
            return false;
        }



    }

    /**
     * 登录方法
     * @param user
     * @return
     */
    @Override
    public User login(User user) {
        return userDao.findByTelephoneAndPassword(user.getTelephone(),user.getPassword());
    }
}
