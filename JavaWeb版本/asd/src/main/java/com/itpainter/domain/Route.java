package com.itpainter.domain;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

/**
 * 旅游线路商品实体类
 */
public class Route implements Serializable {

    private int n_id;
    private String notename;
    private String tag;
    private int user_id;
    private String notecontent;
    private int like_num;
    private int read_num;
    private Timestamp starttime;
    public int getN_id() {
        return n_id;
    }

    public void setN_id(int n_id) {
        this.n_id = n_id;
    }

    public String getNotename() {
        return notename;
    }

    public void setNotename(String notename) {
        this.notename = notename;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getNotecontent() {
        return notecontent;
    }

    public void setNotecontent(String notecontent) {
        this.notecontent = notecontent;
    }

    public int getLike_num() {
        return like_num;
    }

    public void setLike_num(int like_num) {
        this.like_num = like_num;
    }

    public int getRead_num() {
        return read_num;
    }

    public void setRead_num(int read_num) {
        this.read_num = read_num;
    }

    public Timestamp getStarttime() {
        return starttime;
    }

    public void setStarttime(Timestamp starttime) {
        this.starttime = starttime;
    }

    public Route() {
    }

    public Route(int n_id, String notename, String tag, int user_id, String notecontent, int like_num, int read_num, Timestamp starttime) {
        this.n_id = n_id;
        this.notename = notename;
        this.tag = tag;
        this.user_id = user_id;
        this.notecontent = notecontent;
        this.like_num = like_num;
        this.read_num = read_num;
        this.starttime = starttime;
    }
}
