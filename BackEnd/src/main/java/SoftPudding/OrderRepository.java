package SoftPudding;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Qualifier
public interface OrderRepository extends CrudRepository<order, Integer> {
    @Query(value = "SELECT * FROM orders WHERE userid= ?1", nativeQuery = true)
    public List<order> getAllOrders(int userid);
}