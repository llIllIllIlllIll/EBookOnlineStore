package SoftPudding;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin(origins = "*" ,maxAge = 3600)
@Controller    // This means that this class is a Controller
@RequestMapping(path="/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/all")
    public @ResponseBody List<order> all(HttpServletRequest request, HttpServletResponse response){
        Integer userid=(Integer)request.getSession().getAttribute("USERID");
        response.setHeader("Access-Control-Allow-Origin","null");
        response.setHeader("Access-Control-Allow-Credentials","true");
        List<order> orders= orderRepository.getAllOrders(userid);
        for(order it:orders){
            List<orderitem> allitems = infoAboutOrder(it.getOrderid());
            float allcost=0;int allbooks=0;
            for(orderitem item: allitems){
                allcost+=item.getNum()*item.getPrice_each();
                allbooks+=item.getNum();
            }
            it.setAllbooks(allbooks);
            it.setAllcost(allcost);
        }
        return orders;
    }

    @CrossOrigin(origins = "*", maxAge = 3600)
    @GetMapping(path="/info")
    public @ResponseBody List<orderitem> infoAboutOrder(@RequestParam int orderid){
        return orderItemRepository.searchForOrder(orderid);
    }
}