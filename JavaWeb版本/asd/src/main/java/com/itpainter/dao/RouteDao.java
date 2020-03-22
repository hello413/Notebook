package com.itpainter.dao;



import com.itpainter.domain.Route;

import java.util.List;

public interface RouteDao {

    /**
     * 根据cid查询总记录数
     */
    public int findTotalCount(int cid,String rname);

    /**
     * 根据cid，start,pageSize查询当前页的数据集合
     */
    public List<Route> findByPage(int cid, int start, int pageSize,String rname);

    boolean write(int u_id,String notename, String notecontent, String tag);

    Route read(String n_id);

    int readsum(int user_id);

    int likesum(int user_id);

    int todaywritesum(int user_id);

    void delect(String n_id);

    void update(String notename, String notecontent, String tag, String n_id);
}
