package SoftPudding.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

// 书评模块 这个用mongo存
@Document(collection = "bookcomments")
public class m_bookcomment {
    @Id
    private String _id;
    private int bookid;
    //yyyy-MM-dd hh:mm:ss
    private String commenttime;
    private String content;
    private int userid;
    private Set<m_sec_comment> sec_comments;


    public m_bookcomment(int bookid,String content,int userid){
        this.bookid = bookid;
        this.content = content;
        java.text.DateFormat format_ = new java.text.SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        this.commenttime = format_.format(new Date());
        this.userid=userid;
        sec_comments=new LinkedHashSet<m_sec_comment>();
    }
    public String get_id(){
        return this._id;
    }
    public void set_id(String _id){
        this._id=_id;
    }
    public int getBookid(){
        return this.bookid;
    }
    public void setBookid(int bookid){
        this.bookid=bookid;
    }
    public String getCommenttime(){
        return this.commenttime;
    }
    public void setCommenttime(String commenttime){
        this.commenttime=commenttime;
    }
    public String getContent(){
        return this.content;
    }
    public void setContent(String content){
        this.content=content;
    }
    public int getUserid(){
        return this.userid;
    }
    public void setUserid(int userid){
        this.userid=userid;
    }
    public Set<m_sec_comment> getSec_comments(){
        return this.sec_comments;
    }
    public void setSec_comments(Set<m_sec_comment> sec_comments){
        this.sec_comments=sec_comments;
    }
}
