package com.itpainter.web.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itpainter.domain.ResultInfo;
import com.itpainter.domain.User;
import com.itpainter.service.UserService;
import com.itpainter.service.impl.UserServiceImpl;
import org.apache.commons.beanutils.BeanUtils;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.Random;

@WebServlet("/user/*")
public class UserServlet extends BaseServlet {

    //声明UserService业务对象
    private UserService service = new UserServiceImpl();

    /**
     * 注册功能
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void regist(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String check = request.getParameter("check");
        HttpSession session = request.getSession();
        String checkcode = (String) session.getAttribute("CHECKCODE");
        System.out.println(check+"-----------"+checkcode);
        session.removeAttribute("CHECKCODE");//为了保证验证码只能使用一次
        //比较
        if(checkcode == null || !checkcode.equalsIgnoreCase(check)){
            //验证码错误
            ResultInfo info = new ResultInfo();
            //注册失败
            info.setFlag(false);
            info.setErrorMsg("验证码错误");
            //将info对象序列化为json
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(info);
            response.setContentType("application/json;charset=utf-8");
            response.getWriter().write(json);
            return;
        }
        Map<String, String[]> map = request.getParameterMap();
        User user = new User();
        try {
            BeanUtils.populate(user,map);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        //UserService userService = new UserServiceImpl();
        int flag = service.regist(user);
        ResultInfo info = new ResultInfo();
        //4.响应结果
        if(flag==0){
            //注册成功
            info.setFlag(true);
        }else if (flag == 1){
            //注册失败
            info.setFlag(false);
            info.setErrorMsg("注册失败!已经有人用这个用户名了");
        }else {
            //注册失败
            info.setFlag(false);
            info.setErrorMsg("注册失败!已经有人用这个手机号码了");
        }

        //将info对象序列化为json
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(info);

        //将json数据写回客户端
        //设置content-type
        response.setContentType("application/json;charset=utf-8");
        response.getWriter().write(json);
    }

    /**
     * 登录功能
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取用户名和密码数据
        Map<String, String[]> map = request.getParameterMap();
        //2.封装User对象
        User user = new User();
        try {
            BeanUtils.populate(user,map);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }

        //3.调用Service查询
        //UserService service = new UserServiceImpl();
        User u  = service.login(user);

        ResultInfo info = new ResultInfo();

        //4.判断用户对象是否为null
        if(u == null){
            //用户名密码或错误
            info.setFlag(false);
            info.setErrorMsg("用户名密码或错误");
        }
        //5.判断用户是否激活
        if(u != null && !"T".equals(u.getStatus())){
            //用户尚未激活
            info.setFlag(false);
            info.setErrorMsg("您尚未激活，请激活");
        }
        //6.判断登录成功
        if(u != null && "T".equals(u.getStatus())){
            request.getSession().setAttribute("user",u);//登录成功标记
            //登录成功
            info.setFlag(true);
        }

        //响应数据
        ObjectMapper mapper = new ObjectMapper();

        response.setContentType("application/json;charset=utf-8");
        mapper.writeValue(response.getOutputStream(),info);
    }

    /**
     * 返回当前session的用户
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void findself(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Object user = request.getSession().getAttribute("user");
        //将user写回客户端

        ObjectMapper mapper = new ObjectMapper();
        response.setContentType("application/json;charset=utf-8");
        mapper.writeValue(response.getOutputStream(),user);
    }

    /**
     * 退出登录功能
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void exitit(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getSession().invalidate();
        response.sendRedirect(request.getContextPath()+"/login.html");
    }

    /**
     * 验证码功能
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void checkcode(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int width=100;
        int height=50;

        //1.创建一BufferedImage对象，规定图片格式
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR);//红绿蓝

        //2.美化
        Graphics graphics = image.getGraphics();//画笔对象
        //2.1背景色
        graphics.setColor(Color.pink);
        graphics.fillRect(0,0,width,height);//方法作用：填充
        //2.2边框颜色
        graphics.setColor(Color.BLUE);
        graphics.drawRect(0,0,width-1,height-1);//方法作用：从坐标(0,0)到坐标(width,height)

        //2.3生成验证码
        String str="ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
        int size = 4;//生成验证码个数
        Random random = new Random();
        String checkcode="";
        //设置字体的小大
        graphics.setFont(new Font("黑体",Font.BOLD,24));
        for (int i=1;i<=size;i++) {
            int index = random.nextInt(str.length());
            graphics.drawString(str.charAt(index) + "", width/(size+1)*i, height/2);
            checkcode+=str.charAt(index);
        }
        request.getSession().setAttribute("CHECKCODE",checkcode);
        //2.4干扰线
        graphics.setColor(Color.GREEN);
        int nums = random.nextInt(5) + 6;
        for (int i=0;i<nums;i++){
            int x1 = random.nextInt(width);
            int x2 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int y2 = random.nextInt(height);

            graphics.drawLine(x1,x2,y1,y2);
        }

        //3.展示
        ImageIO.write(image,"jpg",response.getOutputStream());
    }

    /**
     * 激活账户功能
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void active(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.获取激活码
        String code = request.getParameter("code");
        if(code != null){
            //2.调用service完成激活
            //UserService service = new UserServiceImpl();
            boolean flag = service.active(code);

            //3.判断标记
            String msg = null;
            if(flag){
                //激活成功
                msg = "激活成功，请<a href='login.html'>登录</a>";
            }else{
                //激活失败
                msg = "激活失败，请联系管理员!";
            }
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write(msg);
        }
    }
}
