package com.itpainter.service.impl;

import com.itpainter.dao.RouteDao;
import com.itpainter.dao.impl.RouteDaoImpl;
import com.itpainter.domain.PageBean;
import com.itpainter.domain.Route;
import com.itpainter.service.RouteService;

import java.util.HashMap;
import java.util.List;

public class RouteServiceImpl implements RouteService {
    private RouteDao routeDao = new RouteDaoImpl();
    @Override
    public PageBean<Route> pageQuery(int cid, int currentPage, int pageSize,String rname) {
        //封装PageBean
        PageBean<Route> pb = new PageBean<Route>();
        //设置当前页码
        pb.setCurrentPage(currentPage);
        //设置每页显示条数
        pb.setPageSize(pageSize);
        
        //设置总记录数
        int totalCount = routeDao.findTotalCount(cid,rname);
        pb.setTotalCount(totalCount);
        //设置当前页显示的数据集合
        int start = (currentPage - 1) * pageSize;//开始的记录数
        List<Route> list = routeDao.findByPage(cid,start,pageSize,rname);
        pb.setList(list);

        //设置总页数 = 总记录数/每页显示条数
        int totalPage = totalCount % pageSize == 0 ? totalCount / pageSize :(totalCount / pageSize) + 1 ;
        pb.setTotalPage(totalPage);


        return pb;
    }

    @Override
    public boolean write(int u_id,String notename, String notecontent, String tag) {
        return routeDao.write(u_id,notename,notecontent,tag);
    }

    @Override
    public Route read(String n_id) {
        return routeDao.read(n_id);
    }

    @Override
    public HashMap sum(int user_id) {
        HashMap map = new HashMap();
        map.put("readsum",routeDao.readsum(user_id));
        map.put("likesum",routeDao.likesum(user_id));
        map.put("todaywritesum",routeDao.todaywritesum(user_id));
        return map;
    }

    @Override
    public void delect(String n_id) {
        routeDao.delect(n_id);
    }

    @Override
    public void update(String notename, String notecontent, String tag, String n_id) {
        routeDao.update(notename,notecontent,tag,n_id);
    }

}
