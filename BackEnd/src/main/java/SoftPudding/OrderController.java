package SoftPudding;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

@CrossOrigin(origins = "*" ,maxAge = 3600)
@Controller    // This means that this class is a Controller
@RequestMapping(path="/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private BookRepository bookRepository;

    final String ORIGIN="http://106.12.89.107";

    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/all")
    public @ResponseBody List<order> all(HttpServletRequest request, HttpServletResponse response){
        Integer userid=(Integer)request.getSession().getAttribute("USERID");
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
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

    @CrossOrigin(origins = "*", maxAge = 3600)
    @GetMapping(path="/addToCart")
    public @ResponseBody boolean addToCart(@RequestParam int bookid,HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");

        HttpSession session = request.getSession();
        if(session.getAttribute("CART")==null){
            session.setAttribute("CART",new HashMap<Integer,Integer>());
            Map<Integer,Integer> cart= (Map<Integer,Integer>)session.getAttribute("CART");
            cart.put(bookid,1);
            session.setAttribute("CART",cart);

            System.out.println((Map)session.getAttribute("CART"));

            return true;
        }
        else{
            Map<Integer,Integer> cart= (Map<Integer,Integer>)session.getAttribute("CART");
            if(cart.get(bookid)==null){
                cart.put(bookid,1);
            }
            else{
                cart.put(bookid,cart.get(bookid)+1);
            }
            session.setAttribute("CART",cart);

            System.out.println((Map)session.getAttribute("CART"));

            return true;

        }
    }

    @CrossOrigin(origins = "*", maxAge = 3600)
    @GetMapping(path="/getCart")
    public @ResponseBody List<cartitem> getCart(HttpServletRequest request, HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");

        List<cartitem> cart = new ArrayList<cartitem>();
        HttpSession session = request.getSession();
        Map<Integer,Integer> session_cart= (Map<Integer, Integer>)session.getAttribute("CART");
        if(session_cart==null)
            return null;
        else{
            for(Map.Entry<Integer,Integer> entry: session_cart.entrySet()){
                List<book> bk = bookRepository.getBookById(entry.getKey());
                cartitem item = new cartitem();
                item.setBookid(entry.getKey());
                item.setNum(entry.getValue());
                item.setBookname(bk.get(0).getBookname());
                item.setIsbnnum(bk.get(0).getIsbnnum());
                item.setImgurl(bk.get(0).getImgurl());
                item.setPrice(bk.get(0).getPrice());

                cart.add(item);
            }

            System.out.println(cart);
            return cart;
        }
    }

    @CrossOrigin(origins = "*", maxAge = 3600)
    @GetMapping(path="/makeOrder")
    public @ResponseBody boolean makeOrder(HttpServletRequest request,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");

        HttpSession session = request.getSession();
        if(session.getAttribute("CART")==null)
            return false;
        Map<Integer,Integer> cart = (Map<Integer,Integer>)session.getAttribute("CART");
        int userid=(Integer)session.getAttribute("USERID");
        orderRepository.makeNewOrder(userid);
        int orderid= orderRepository.getOrderId();

        for(Map.Entry<Integer,Integer> entry: cart.entrySet()){
            int bookid= entry.getKey();
            int num = entry.getValue();
            List<book> bk= bookRepository.getBookById(bookid);
            float price_each = bk.get(0).getPrice();
            orderItemRepository.newOrderItem(orderid,bookid,price_each,num);
        }

        session.setAttribute("CART",null);
        return true;
    }


}