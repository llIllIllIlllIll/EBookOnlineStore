package SoftPudding;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderid;
    private int userid;
    private Date orderdate;

    public int getOrderid(){
        return orderid;
    }
    public int getUserid(){
        return userid;
    }
    public Date getOrderdate(){
        return orderdate;
    }
    public void setOrderid(int orderid){
        this.orderid=orderid;
    }
    public void setUserid(int userid){
        this.userid=userid;
    }
    public void setOrderdate(Date orderdate){
        this.orderdate=orderdate;
    }

    private float allcost=0;
    private int allbooks=0;
    public int getAllbooks(){
        return allbooks;
    }
    public void setAllbooks(int n){
        this.allbooks=n;
    }
    public float getAllcost(){
        return allcost;
    }
    public void setAllcost(float n){
        this.allcost=n;
    }
}
