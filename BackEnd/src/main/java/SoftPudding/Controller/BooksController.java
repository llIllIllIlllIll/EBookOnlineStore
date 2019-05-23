package SoftPudding.Controller;

import java.util.List;
import java.util.Set;

import SoftPudding.Entity.book;
import SoftPudding.Repository.BookRepository;
import SoftPudding.Service.BookService;
import SoftPudding.ServiceImpl.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*",maxAge = 3600)
@Controller
@RequestMapping(path = "/books")
public class BooksController {
    @Autowired
    private BookService bookService;

    @RequestMapping(path = "/all")
    public
    @ResponseBody
    List<book> allBooks(){
        return bookService.allBooks();
    }

}