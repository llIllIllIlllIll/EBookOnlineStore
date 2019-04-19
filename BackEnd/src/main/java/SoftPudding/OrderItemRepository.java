package SoftPudding;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier
public interface OrderItemRepository extends CrudRepository<orderitem, Integer> {
    @Query(value = "SELECT * FROM order_items WHERE orderid= ?1", nativeQuery = true)
    public List<orderitem> searchForOrder (int orderid);
}