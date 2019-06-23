package SoftPudding.Service;


import SoftPudding.Entity.m_bookcomment;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface BookCommentService {
    Set<m_bookcomment> getComments(int bookid);
    void saveComment(m_bookcomment m);
}
