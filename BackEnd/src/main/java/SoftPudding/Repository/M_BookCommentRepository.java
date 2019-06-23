package SoftPudding.Repository;

import SoftPudding.Entity.m_bookcomment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Set;


public interface M_BookCommentRepository extends MongoRepository<m_bookcomment,String> {
    Set<m_bookcomment> findAllByBookid(int bookid);
}
