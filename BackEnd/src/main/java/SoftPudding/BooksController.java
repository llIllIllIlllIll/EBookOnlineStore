package SoftPudding;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*",maxAge = 3600)
@Controller
@RequestMapping(path = "/books")
public class BooksController {
    @Autowired
    private BookRepository bookRepository;

    @RequestMapping(path = "/all")
    public
    @ResponseBody List<book> allBooks(){
        return bookRepository.all();
    }
}