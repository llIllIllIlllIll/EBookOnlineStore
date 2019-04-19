package SoftPudding;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Qualifier
public interface OrderItemRepository extends CrudRepository<orderitem, Integer> {
    @Query(value = "SELECT * FROM order_items WHERE orderid= ?1", nativeQuery = true)
    public List<orderitem> searchForOrder (int orderid);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO order_items VALUE (?1, ?2, ?3, ?4, null)", nativeQuery = true)
    public void newOrderItem(int orderid, int bookid, float price_each, int num);
}