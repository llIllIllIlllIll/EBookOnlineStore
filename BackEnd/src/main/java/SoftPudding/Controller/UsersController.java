package SoftPudding.Controller;


import SoftPudding.Entity.user;
import SoftPudding.Repository.UserRepository;
import SoftPudding.Service.UserService;
import SoftPudding.ServiceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin(origins = "*" ,maxAge = 3600)
@Controller
@RequestMapping(path="/ebook")
public class UsersController {
    final String ORIGIN="null";

    @Autowired
    UserService userService;

    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/exist")
    public @ResponseBody boolean exist(@RequestParam String accountname){
        if(!userService.checkAccountname(accountname))
            return false;
        else return true;

    }
    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @RequestMapping(value ="/reg", method = RequestMethod.POST)
    public @ResponseBody String register(@RequestParam(value = "accountname") String accountname,
                                         @RequestParam(value = "pwd") String pwd, @RequestParam(value= "email") String email,
                                         HttpServletResponse response)
    {
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");
        userService.saveNewUser(new user(0,accountname,email,pwd));
        return "Registered Successfully";
    }
    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public @ResponseBody Boolean login(@RequestParam(value = "accountname")String accountname,
            @RequestParam(value = "pwd") String pwd,HttpServletRequest request,HttpServletResponse response){
        boolean res = userService.checkAccountnameAndPwd(accountname,pwd);
        HttpSession session= request.getSession();
        if(res)
        {
            int userid = userService.getUseridByAccountname(accountname);
            if(!request.isRequestedSessionIdValid()||session.getAttribute("USERID")==null){
                //System.out.println("No Session Valid.");
                session.setAttribute("USERID",userid);
                session.setAttribute("USERNAME",accountname);
            }
            else {
                /*System.out.println("Session Exist.");
                System.out.println("Current USERID: "+session.getAttribute("USERID"));
                System.out.println("Current USERNAME: "+session.getAttribute("USERNAME"));*/
                session.setAttribute("USERID",userid);
                session.setAttribute("USERNAME",accountname);
                session.setAttribute("CART",null);
            }
            //System.out.println("Session ID: "+session.getId());

            response.setHeader("Access-Control-Allow-Origin",ORIGIN);
            response.setHeader("Access-Control-Allow-Credentials","true");

            response.addCookie(new Cookie("USERID",Long.toString(userid)));
            response.addCookie(new Cookie("USERNAME",accountname));

            //System.out.println();
            return true;
        }
        else {
            response.setHeader("Access-Control-Allow-Origin",ORIGIN);
            response.setHeader("Access-Control-Allow-Credentials","true");

            return false;
        }
    }

    @CrossOrigin(origins = "*",maxAge = 3600)
    @GetMapping("/isLogin")
    public @ResponseBody boolean isLogin(HttpServletRequest request,HttpServletResponse response){
        /*System.out.println("Session: "+request.getSession().getId());
        System.out.println("Session USERID: "+request.getSession().getAttribute("USERID"));
        System.out.println();*/

        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");

        return request.isRequestedSessionIdValid()&&request.getSession().getAttribute("USERID")!=null;
    }

    @CrossOrigin(origins = "*",maxAge = 3600)
    @GetMapping("/name")
    public @ResponseBody String name(HttpServletRequest request,HttpServletResponse response){
        if(request.getSession().getAttribute("USERNAME")==null)
            return "NULL";
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");
        return (String)request.getSession().getAttribute("USERNAME");
    }

    @CrossOrigin(origins = "*",maxAge = 3600)
    @GetMapping("/logout")
    public @ResponseBody void logout(HttpServletRequest request,HttpServletResponse response){
        response.setHeader("Access-Control-Allow-Origin",ORIGIN);
        response.setHeader("Access-Control-Allow-Credentials","true");

        HttpSession session = request.getSession();
        session.setAttribute("USERNAME",null);
        session.setAttribute("CART",null);
        session.setAttribute("USERID",null);
    }
}