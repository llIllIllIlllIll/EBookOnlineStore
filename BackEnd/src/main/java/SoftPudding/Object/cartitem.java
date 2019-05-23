package SoftPudding.Object;


public class cartitem {
    private int bookid;
    private String bookname;
    private String isbnnum;
    private float price;
    private String imgurl;
    private int num;

    public int getBookid(){return bookid;}
    public String getBookname(){return bookname;}
    public String getIsbnnum(){return isbnnum;}
    public float getPrice(){return price;}
    public String getImgurl(){return imgurl;}
    public int getNum(){return num;};

    public void setBookid(int bookid){
        this.bookid=bookid;
    }
    public void setBookname(String bookname){
        this.bookname=bookname;
    }
    public void setIsbnnum(String isbnnum){
        this.isbnnum=isbnnum;
    }
    public void setPrice(float price){
        this.price=price;
    }
    public void setImgurl(String imgurl){
        this.imgurl=imgurl;
    }
    public void setNum(int num){
        this.num=num;
    }

}
