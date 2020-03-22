package com.itpainter.web.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itpainter.domain.PageBean;
import com.itpainter.domain.ResultInfo;
import com.itpainter.domain.Route;
import com.itpainter.domain.User;
import com.itpainter.service.RouteService;
import com.itpainter.service.impl.RouteServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;

@WebServlet("/route/*")
public class RouteServlet extends BaseServlet {

    private RouteService routeService = new RouteServiceImpl();

    /**
     * 分页查询
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void pageQuery(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.接受参数
        User user =(User) request.getSession().getAttribute("user");

        String currentPageStr = request.getParameter("currentPage");//当前页码，如果不传递，则默认为第一页
        String pageSizeStr = request.getParameter("pageSize");//每页显示条数,如果不传递，默认每页显示5条记录

        //接受rname名称
        String rname = request.getParameter("rname");
        int cid = user.getU_id();
//        int cid = 2;
        int currentPage = 0;//当前页码，如果不传递，则默认为第一页
        if(currentPageStr != null && currentPageStr.length() > 0){
            currentPage = Integer.parseInt(currentPageStr);
        }else{
            currentPage = 1;
        }

        int pageSize = 0;//每页显示条数，如果不传递，默认每页显示5条记录
        if(pageSizeStr != null && pageSizeStr.length() > 0){
            pageSize = Integer.parseInt(pageSizeStr);
        }else{
            pageSize = 4;
        }
        //3. 调用service查询PageBean对象
        PageBean<Route> pb = routeService.pageQuery(cid, currentPage, pageSize,rname);
        //4. 将pageBean对象序列化为json，返回
        writeValue(pb,response);

    }

    /**
     * 写文章
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void write(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //1.接受参数
        User user =(User) request.getSession().getAttribute("user");
        int u_id = user.getU_id();
        String notename = request.getParameter("notename");
        String notecontent = request.getParameter("notecontent");
        String tag = request.getParameter("tag");
        boolean flag = routeService.write(u_id,notename, notecontent, tag);
        System.out.println(flag);
        writeValue(flag,response);
    }

    /**
     * 阅读文章
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void read(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String n_id = request.getParameter("n_id");
        Route list = routeService.read(n_id);
        writeValue(list,response);
    }
    public void readsum(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user =(User) request.getSession().getAttribute("user");
        int user_id = user.getU_id();
//        int user_id = 2;
        HashMap map = routeService.sum(user_id);
        writeValue(map,response);
    }
    public void delete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String n_id = request.getParameter("n_id");
        routeService.delect(n_id);
        response.sendRedirect(request.getContextPath()+"/main.html");
    }
    public void update(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String notename = request.getParameter("notename");
        String notecontent = request.getParameter("notecontent");
        String tag = request.getParameter("tag");
        String n_id = request.getParameter("n_id");
        routeService.update(notename,notecontent,tag,n_id);
        response.sendRedirect(request.getContextPath()+"/main.html");
    }
}
