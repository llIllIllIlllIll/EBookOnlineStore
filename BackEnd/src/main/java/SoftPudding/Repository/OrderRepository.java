package SoftPudding.Repository;

import SoftPudding.Entity.order;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Qualifier
public interface OrderRepository extends CrudRepository<order, Integer> {
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO orders VALUE(null,?1,now(),0,0)", nativeQuery = true)
    public void makeNewOrder(int userid);

    @Query(value = "SELECT MAX(orderid) FROM orders", nativeQuery = true)
    public int getOrderId();

    public List<order> getByOrderid(int orderid);

    public List<order> findAll();

    //set those orders whose allcost is 0 to the right content
    @Modifying
    @Transactional
    @Query(value = "CALL calcForAllOrders();", nativeQuery = true)
    public void calcForAllOrders();

    public List<order> getAllByUserid(int userid);

}