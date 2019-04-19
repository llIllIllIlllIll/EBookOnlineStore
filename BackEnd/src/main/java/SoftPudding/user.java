package SoftPudding;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class user {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long ID;

    private String accountname;

    private String email;

    private String pwd;

    private Boolean isadmin;



    public Long getID() {
        return ID;
    }

    public void setID(Long id) {
        this.ID = id;
    }

    public String getAccountname() {
        return accountname;
    }

    public void setAccountname(String name) {
        this.accountname = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd(){
        return this.pwd;
    }

    public void setPwd(String pwd){
        this.pwd=pwd;
    }

    public void setIsadmin(Boolean isadmin) {
        this.isadmin = isadmin;
    }

    public boolean getIsadmin( ){
        return this.isadmin;
    }
}