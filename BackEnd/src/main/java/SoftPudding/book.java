package SoftPudding;

import javax.persistence.*;

@Entity
@Table(name = "books")
class book{
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int bookid;
    private String bookname;
    private String isbnnum;
    private String author;
    private int storage;
    private float  price;
    private String imgurl;

    public int getBookid(){return bookid;}
    public String getBookname(){return bookname;}
    public String getIsbnnum(){return isbnnum;}
    public String getAuthor(){return author;}
    public int getStorage(){return storage;}
    public float getPrice(){return price;}
    public String getImgurl(){return imgurl;}
}
