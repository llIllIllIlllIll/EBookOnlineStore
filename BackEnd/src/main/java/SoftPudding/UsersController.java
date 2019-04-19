package SoftPudding;


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
    final String ORIGIN="http://106.12.89.107";

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/exist")
    public @ResponseBody boolean exist(@RequestParam String accountname){
        if(userRepository.search(accountname)==0)
            return false;
        else return true;

    }
    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/reg")
    public @ResponseBody String register(@RequestParam String accountname,@RequestParam String pwd, @RequestParam String email)
    {
        userRepository.register(accountname,pwd,email);
        return "Registered Successfully";
    }
    @CrossOrigin(origins = "*" ,maxAge = 3600)
    @GetMapping(path="/login")
    public @ResponseBody Boolean login(@RequestParam String accountname, @RequestParam String pwd, HttpServletRequest request
                                        ,HttpServletResponse response){
        List<Integer> res = userRepository.login(accountname, pwd);
        HttpSession session= request.getSession();
        if(res.size()==1)
        {
            int userid = res.get(0);
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

            response.addCookie(new Cookie("USERID",Integer.toString(userid)));
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
}