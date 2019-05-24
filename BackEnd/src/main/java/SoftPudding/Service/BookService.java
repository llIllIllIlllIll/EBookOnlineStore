package SoftPudding.Service;

import SoftPudding.Entity.book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    List<book> allBooks();
    book getByBookid(int bookid);
    void deleteNBooksFromStorage(int num,int bookid);
    void saveNewBook(book b);
    void deleteBook(int bookid);
}
