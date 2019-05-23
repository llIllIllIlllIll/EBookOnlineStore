package SoftPudding.Service;


import SoftPudding.Entity.orderitem;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface OrderService {
    public Set<orderitem> getOrderitemsByOrderid(int orderid);
    public void makeNewOrder(int userid);
    public int getLatestOrderid();
    public void saveOrderitem(int orderid, int bookid, float price, int num);
}