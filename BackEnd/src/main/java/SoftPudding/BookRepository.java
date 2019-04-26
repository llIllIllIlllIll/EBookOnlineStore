package SoftPudding;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
@Repository
@Qualifier
public interface BookRepository extends CrudRepository<book, Integer> {
    @Query(value = "SELECT * FROM books", nativeQuery = true)
    public List<book> all ();

    @Query(value = "SELECT * FROM books WHERE bookid= ?1", nativeQuery = true)
    public List<book> getBookById(int bookid);

    @Modifying
    @Transactional
    @Query(value = "UPDATE books SET books.storage = books.storage - ?1 WHERE bookid = ?2",nativeQuery = true)
    public void orderNBooks(int n, int bookid);
}