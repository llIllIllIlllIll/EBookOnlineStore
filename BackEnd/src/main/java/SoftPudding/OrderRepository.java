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
public interface OrderRepository extends CrudRepository<order, Integer> {
    @Query(value = "SELECT * FROM orders WHERE userid= ?1", nativeQuery = true)
    public List<order> getAllOrders(int userid);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO orders VALUE(null,?1,now(),0,0)", nativeQuery = true)
    public void makeNewOrder(int userid);

    @Query(value = "SELECT MAX(orderid) FROM orders", nativeQuery = true)
    public int getOrderId();
}