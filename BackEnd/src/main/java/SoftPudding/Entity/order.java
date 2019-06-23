package SoftPudding.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "orders")
public class order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderid;

    private int userid;

    private String orderdate;

    @OneToMany(mappedBy = "orderid",fetch = FetchType.LAZY)
    private Set<orderitem> orderitems;

    public order(){}

    public int getOrderid(){
        return orderid;
    }

    public int getUserid(){
        return userid;
    }

    public String getOrderdate(){
        return orderdate;
    }

    public void setOrderid(int orderid){
        this.orderid=orderid;
    }

    public void setUserid(int userid){
        this.userid=userid;
    }

    public void setOrderdate(String orderdate){
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

    @JsonIgnore
    public Set<orderitem> getOrderitems(){
        return this.orderitems;
    }

    public void setOrderitems(Set<orderitem> orderitems){
        this.orderitems=orderitems;
    }
}
