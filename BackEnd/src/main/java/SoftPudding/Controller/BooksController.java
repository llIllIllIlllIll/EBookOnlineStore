package SoftPudding.Controller;

import java.io.File;
import java.util.*;

import SoftPudding.Entity.book;
import SoftPudding.Entity.m_bookcomment;
import SoftPudding.Entity.m_sec_comment;
import SoftPudding.Entity.user;
import SoftPudding.Repository.BookRepository;
import SoftPudding.Service.BookCommentService;
import SoftPudding.Service.BookService;
import SoftPudding.Service.UserService;
import SoftPudding.ServiceImpl.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@CrossOrigin(value = "*",maxAge = 3600)
@Controller
@RequestMapping(path = "/books")
public class BooksController {
    final String ORIGIN="null";
    final String BOOKCOVERPATH="C:\\Users\\11570\\ebookimgs\\bookcovers\\";
    static Random rand =new Random();

    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookCommentService bookCommentService;

    @RequestMapping(path = "/all")
    public @ResponseBody List<book> allBooks()
    {
        return bookService.allBooks();
    }

    @RequestMapping(path = "/getbook")
    public @ResponseBody book getBook(@RequestParam(value = "bookid")int bookid)
    {
        return bookService.getByBookid(bookid);
    }

    @RequestMapping(path = "/addComments")
    public void addComments(){
        List<book> bookSet = bookService.allBooks();
        for(book bk: bookSet){
            int bookid = bk.getBookid();
            m_bookcomment mBookcomment = new m_bookcomment(bookid,"Can this book be a little cheaper?",1);
            m_sec_comment secComment1 = new m_sec_comment(2,"I agree...");
            m_sec_comment secComment2 = new m_sec_comment(3,"I think it's already cheap come on you guys..");
            secComment1.getF_comments().add(secComment2);
            mBookcomment.getSec_comments().add(secComment1);
            bookCommentService.saveComment(mBookcomment);
        }
    }

    @RequestMapping(path = "/comments")
    public @ResponseBody Set<m_bookcomment> getComments(@RequestParam(value="bookid") int bookid){
        return bookCommentService.getComments(bookid);
    }

    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @RequestMapping(value ="/insert", method = RequestMethod.POST)
    public @ResponseBody void register(@RequestParam(value="bookname") String bookname,@RequestParam(value ="author") String author,
                                       @RequestParam(value ="isbnnum") String isbnnum, @RequestParam(value = "price") float price,
                                       @RequestParam(value ="storage") int storage, @RequestParam(value = "bookcover") MultipartFile file)
            throws Exception
    {
        String filePath;
        if(file!=null&&!file.isEmpty()){
            filePath= BOOKCOVERPATH+new Date().getTime()+rand.nextInt(9999)+file.getOriginalFilename();
            file.transferTo(new File(filePath));
        }
        else throw new Exception("No file is uploaded");
        bookService.saveNewBook(new book(bookname,isbnnum,author,storage,price,filePath));
    }

    @CrossOrigin(origins = "*", maxAge = 3600)
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public @ResponseBody boolean register(HttpServletRequest request, HttpServletResponse response,
                                       @RequestParam(value = "bookid") int bookid) throws Exception
    {
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");
        HttpSession session = request.getSession();
        Integer userid = (Integer)session.getAttribute("USERID");
        if(userid == null){
            throw new Exception("Request does not have a valid session.");
        }
        if(userService.checkIsadmin(userid)){
            bookService.deleteBook(bookid);
            return true;
        }
        return false;
    }


}