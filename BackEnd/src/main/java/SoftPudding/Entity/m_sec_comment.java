package SoftPudding.Entity;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

public class m_sec_comment {
    private int userid;
    private String content;
    private String commenttime;
    private Set<m_sec_comment> f_comments;
    public m_sec_comment(int userid,String content){
        this.userid=userid;
        this.content = content;
        java.text.DateFormat format_ = new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        this.commenttime = format_.format(new Date());
        this.f_comments= new LinkedHashSet<m_sec_comment>();
    }


    public int getUserid(){
        return this.userid;
    }
    public void setUserid(int userid){
        this.userid=userid;
    }
    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content=content;
    }
    public String getCommenttime(){
        return this.commenttime;
    }
    public void setCommenttime(String commenttime){
        this.commenttime=commenttime;
    }
    public Set<m_sec_comment> getF_comments(){
        return this.f_comments;
    }
    public void setF_comments(Set<m_sec_comment> f_comments){
        this.f_comments=f_comments;
    }
}
