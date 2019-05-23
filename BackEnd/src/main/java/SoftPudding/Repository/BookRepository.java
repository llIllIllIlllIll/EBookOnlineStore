package SoftPudding.Repository;

import SoftPudding.Entity.book;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
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

    public List<book> findAll ();

    public List<book> getByBookid(int bookid);

    @Modifying
    @Transactional
    @Query(value = "UPDATE books SET books.storage = books.storage - ?1 WHERE bookid = ?2",nativeQuery = true)
    public void orderNBooks(int n, int bookid);
}