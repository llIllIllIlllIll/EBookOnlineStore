package SoftPudding.Service;

import SoftPudding.Entity.order;
import SoftPudding.Entity.user;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService{
    public void saveNewUser(user u);
    public boolean checkAccountnameAndPwd(String accountname,String pwd);
    public user searchById(int id);
    public int getUseridByAccountname(String accountname);
    public boolean checkAccountname(String accountname);
    public boolean checkIsadmin(int id);
    public List<user> findAllUsers();
}