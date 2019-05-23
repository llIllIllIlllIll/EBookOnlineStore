package SoftPudding.ServiceImpl;


import SoftPudding.Repository.OrderRepository;
import SoftPudding.Repository.OrderitemRepository;
import SoftPudding.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import SoftPudding.Entity.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderitemRepository orderitemRepository;

    public Set<orderitem> getOrderitemsByOrderid(int orderid){
        return orderRepository.getByOrderid(orderid).get(0).getOrderitems();
    }

    public void makeNewOrder(int userid){
        orderRepository.makeNewOrder(userid);
    }

    public int getLatestOrderid(){
        return orderRepository.getOrderId();
    }

    public void saveOrderitem(int orderid, int bookid, float p, int n){
        orderitemRepository.save(orderid,bookid,p,n);
    }

}
