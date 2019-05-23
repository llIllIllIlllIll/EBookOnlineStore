package SoftPudding.Repository;

import SoftPudding.Entity.orderitem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface OrderitemRepository extends CrudRepository<orderitem,Integer> {
    @Modifying
    @Transactional
    @Query(value ="INSERT INTO order_items VALUE(?1 ,?2, ?3, ?4, NULL)", nativeQuery = true)
    public void save(int orderid, int bookid, float price_each, int num);
}
