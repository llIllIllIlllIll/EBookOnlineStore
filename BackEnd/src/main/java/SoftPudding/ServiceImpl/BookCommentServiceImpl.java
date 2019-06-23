package SoftPudding.ServiceImpl;

import SoftPudding.Entity.m_bookcomment;
import SoftPudding.Repository.M_BookCommentRepository;
import SoftPudding.Service.BookCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class BookCommentServiceImpl implements BookCommentService {
    @Autowired
    M_BookCommentRepository bookCommentRepository;

    public Set<m_bookcomment> getComments(int bookid){
        return bookCommentRepository.findAllByBookid(bookid);
    }

    public void saveComment(m_bookcomment m){
        bookCommentRepository.save(m);
    }
}
