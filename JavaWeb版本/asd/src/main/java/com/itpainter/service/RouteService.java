package com.itpainter.service;

import com.itpainter.domain.PageBean;
import com.itpainter.domain.Route;

import java.util.HashMap;
import java.util.List;

public interface RouteService {
    /**
     * 根据类别进行分页查询
     * @param cid
     * @param currentPage
     * @param pageSize
     * @return
     */
    public PageBean<Route> pageQuery(int cid, int currentPage, int pageSize,String rname);

    boolean write(int u_id,String notename, String notecontent, String tag);

    Route read(String n_id);

    HashMap sum(int user_id);

    void delect(String n_id);

    void update(String notename, String notecontent, String tag, String n_id);
}
