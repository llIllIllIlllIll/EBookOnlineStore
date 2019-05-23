package SoftPudding.ServiceImpl;

import SoftPudding.Entity.book;
import SoftPudding.Service.BookService;
import SoftPudding.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    BookRepository bookRepository;


    public List<book> allBooks(){
        return bookRepository.findAll();
    }

    public book getByBookid(int bookid){
        return bookRepository.getByBookid(bookid).get(0);
    }

    public void deleteNBooksFromStorage(int num, int bookid){
        bookRepository.orderNBooks(num,bookid);
    }
}
