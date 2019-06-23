package SoftPudding.Repository;

import SoftPudding.Entity.user;
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
public interface UserRepository extends CrudRepository<user, Integer> {

    @Query(value = "SELECT exist_user( ?1 )", nativeQuery = true)
    public int search (String accountname);

    @Query(value= "SELECT id FROM user WHERE accountname= ?1 AND pwd = ?2",nativeQuery = true)
    public List<Integer> login (String accountname, String pwd);

    public List<user> getById(int id);

    public List<user> getByAccountname(String accountname);

    public List<user> findAll();
}