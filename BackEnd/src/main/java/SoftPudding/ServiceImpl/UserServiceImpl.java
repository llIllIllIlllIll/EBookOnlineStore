package SoftPudding.ServiceImpl;

import SoftPudding.Entity.order;
import SoftPudding.Entity.user;
import SoftPudding.Repository.UserRepository;
import SoftPudding.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    public int getUseridByAccountname(String accountname){
        return userRepository.getByAccountname(accountname).get(0).getID();
    }

    public void saveNewUser(user u){
        userRepository.save(u);
    }

    public boolean checkAccountnameAndPwd(String accountname,String pwd){
        if(userRepository.login(accountname,pwd).size()==1)
            return true;
        else
            return false;
    }

    public user searchById(int id){
        user u=userRepository.getById(id).get(0);
        if(u!=null)
            return u;
        else
            return null;
    }

    public boolean checkAccountname(String name){
        return userRepository.search(name)==1;
    }

    public boolean checkIsadmin(int userid){
        List<user> res= userRepository.getById(userid);
        if(res!=null){
            return res.get(0).getIsadmin();
        }
        return false;
    }

}
