package com.itpainter.web.servlet;

import com.itpainter.domain.PageBean;
import com.itpainter.domain.Route;
import com.itpainter.domain.User;
import com.itpainter.service.RouteService;
import com.itpainter.service.impl.RouteServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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

        int cid = user.getU_id();
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
        PageBean<Route> pb = routeService.pageQuery(cid, currentPage, pageSize);
        //4. 将pageBean对象序列化为json，返回
        writeValue(pb,response);

    }

}
