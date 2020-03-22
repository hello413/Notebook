package com.itpainter.dao.impl;


import com.itpainter.dao.RouteDao;
import com.itpainter.domain.Route;
import com.itpainter.domain.User;
import com.itpainter.util.JDBCUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class RouteDaoImpl implements RouteDao {
    private JdbcTemplate template = new JdbcTemplate(JDBCUtils.getDataSource());

    @Override
    public int findTotalCount(int cid,String rname) {
        String sql = "select count(*) from note where user_id = ? ";

        StringBuilder sb = new StringBuilder(sql);
        List params = new ArrayList();//条件们
        params.add(cid);
        if(rname != null && rname.length() > 0){
            sb.append(" and notename like ? ");
            params.add("%"+rname+"%");
        }
        sql = sb.toString();
        return template.queryForObject(sql,Integer.class,params.toArray());
    }

    @Override
    public List<Route> findByPage(int cid, int start, int pageSize,String rname) {
        String sql = "select * from note where user_id = ? ";

        StringBuilder sb = new StringBuilder(sql);

        List params = new ArrayList();//条件们
        params.add(cid);
        if(rname != null && rname.length() > 0){
            sb.append(" and notename like ? ");
            params.add("%"+rname+"%");
        }
        sb.append(" limit ? , ? ");//分页条件

        sql = sb.toString();

        params.add(start);
        params.add(pageSize);
        List<Route> query = template.query(sql, new BeanPropertyRowMapper<Route>(Route.class), params.toArray());
        return query;
    }

    @Override
    public boolean write(int u_id,String notename, String notecontent, String tag) {
        //1.定义sql
        String sql = "insert into note(notename,notecontent,tag,user_id) values(?,?,?,?)";
        //2.执行sql

        int i = template.update(sql, notename,notecontent,tag,u_id);
        if (i==0){
            return false;
        }else {
            return true;
        }
    }

    @Override
    public Route read(String n_id) {
        String sql0 = "UPDATE note SET read_num = read_num + 1 WHERE (n_id = ?);";
        template.update(sql0,n_id);
        Route route = null;
        try {
            String sql = "select * from note where n_id = ?";
            route = template.queryForObject(sql,new BeanPropertyRowMapper<Route>(Route.class),n_id);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return route;
    }

    @Override
    public int readsum(int user_id) {
        int num = 0;
        try {
            String sql = "select sum(read_num) from note where user_id = ?;";
            num=template.queryForObject(sql,Integer.class,user_id);
        } catch (NullPointerException e) {
        }
        return num;
    }

    @Override
    public int likesum(int user_id) {
        int num = 0;
        try {
            String sql = "select sum(like_num) from note where user_id = ?;";
            num = template.queryForObject(sql,Integer.class,user_id);
        } catch (NullPointerException e) {
        }
        return num;
    }

    @Override
    public int todaywritesum(int user_id) {
        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());
        String format = formatter.format(date);
        String sql = "select count(*) from test.note where user_id = ? and starttime like \"%"+format+"%\";";
        int a = 0;
        try {
            a = template.queryForObject(sql,Integer.class,user_id);
        } catch (DataAccessException e) {
            e.printStackTrace();
        }
        return a;
    }

    @Override
    public void delect(String n_id) {
        String sql = "delete from note where n_id = ?";
        try {
            template.update(sql,n_id);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(String notename, String notecontent, String tag, String n_id) {
        String sql ="UPDATE note SET notename = ?, tag = ?, notecontent = ? WHERE (n_id = ?);";
        try {
            template.update(sql,notename,notecontent,tag,n_id);
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
    }
}
