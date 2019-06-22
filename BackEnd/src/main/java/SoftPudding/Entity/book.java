package SoftPudding.Entity;

import javax.persistence.*;

@Entity
@Table(name = "books")
public class book{
    @Id
    private int bookid;

    private String bookname;

    private String isbnnum;

    private String author;

    private int storage;

    private float  price;

    private String imgurl;

    public book(String bookname, String isbnnum, String author, int storage,float price, String url){
        this.bookname=bookname;
        this.isbnnum=isbnnum;
        this.author=author;
        this.storage=storage;
        this.price=price;
        this.imgurl=url;
    }
    public book(){}

    public int getBookid(){return bookid;}
    public String getBookname(){return bookname;}
    public String getIsbnnum(){return isbnnum;}
    public String getAuthor(){return author;}
    public int getStorage(){return storage;}
    public float getPrice(){return price;}
    public String getImgurl(){return imgurl;}
    public void setBookname(String bookname){
        this.bookname=bookname;
    }
    public void setIsbnnum(String isbnnum){
        this.isbnnum=isbnnum;
    }
    public void setAuthor(String author){
        this.author=author;
    }
    public void setPrice(float price){
        this.price=price;
    }
    public void setStorage(int storage){
        this.storage=storage;
    }
    public void setImgurl(String imgurl){
        this.imgurl=imgurl;
    }
}
