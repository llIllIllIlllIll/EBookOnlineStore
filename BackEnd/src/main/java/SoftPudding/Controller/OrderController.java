package SoftPudding.Controller;


import SoftPudding.Entity.*;
import SoftPudding.Object.cartitem;
import SoftPudding.Service.BookService;
import SoftPudding.Service.OrderService;
import SoftPudding.Service.UserService;
import SoftPudding.ServiceImpl.BookServiceImpl;
import SoftPudding.ServiceImpl.OrderServiceImpl;
import SoftPudding.ServiceImpl.UserServiceImpl;
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
    final String ORIGIN="null";

    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;

    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/all")
    public @ResponseBody Set<order> all(HttpServletRequest request, HttpServletResponse response){
        int userid=(int)request.getSession().getAttribute("USERID");
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");
        Set<order> orders= userService.searchById(userid).getOrders();
        for(order it:orders){
            Set<orderitem> allitems = it.getOrderitems();
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
    public @ResponseBody Set<orderitem> infoAboutOrder(@RequestParam int orderid){
        return orderService.getOrderitemsByOrderid(orderid);
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
                book bk = bookService.getByBookid(entry.getKey());
                cartitem item = new cartitem();
                item.setBookid(entry.getKey());
                item.setNum(entry.getValue());
                item.setBookname(bk.getBookname());
                item.setIsbnnum(bk.getIsbnnum());
                item.setImgurl(bk.getImgurl());
                item.setPrice(bk.getPrice());

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
        orderService.makeNewOrder(userid);
        int orderid= orderService.getLatestOrderid();

        for(Map.Entry<Integer,Integer> entry: cart.entrySet()){
            int bookid= entry.getKey();
            int num = entry.getValue();
            book bk = bookService.getByBookid(bookid);
            float price_each = bk.getPrice();
            orderService.saveOrderitem(orderid,bookid,price_each,num);
            bookService.deleteNBooksFromStorage(num,bookid);
        }

        session.setAttribute("CART",null);
        return true;
    }

    @CrossOrigin(origins = "*", maxAge = 3600)
    @GetMapping(path = "/deleteItem")
    public @ResponseBody List<cartitem> deleteItem(@RequestParam int bookid,HttpServletRequest request,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");
        HttpSession session = request.getSession();
        Map<Integer,Integer> cart = (Map<Integer, Integer>)session.getAttribute("CART");
        cart.remove(bookid);
        System.out.println("removed bookid ="+bookid);
        session.setAttribute("CART",cart);
        System.out.println(session.getAttribute("CART"));
        return getCart(request,response);
    }



}