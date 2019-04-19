package SoftPudding;

import javax.persistence.Id;
import javax.persistence.Entity;

@Entity
class orderitem {
    private int orderid;
    private int bookid;
    private float price_each;
    private int num;
    @Id
    private int id;
    public void setOrderid(int orderid){
        this.orderid=orderid;
    }
    public void setBookid(int bookid){
        this.bookid=bookid;
    }

    public void setPrice_each(float price_each) {
        this.price_each = price_each;
    }
    public void setNum(int num){
        this.num= num;
    }
    public int getOrderid(){
        return this.orderid;
    }
    public int getBookid(){
        return this.bookid;
    }

    public float getPrice_each() {
        return price_each;
    }

    public int getNum() {
        return num;
    }
    public long getId(){
        return id;
    }
    public void setId(int id){
        this.id=id;
    }

}
