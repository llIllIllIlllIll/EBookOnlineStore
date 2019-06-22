package SoftPudding.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table (name = "user")
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "accountname")
    private String accountname;

    @Column(name = "email")
    private String email;

    @Column(name = "pwd")
    private String pwd;

    @Column(name = "isadmin")
    private Boolean isadmin;

    @Column(name = "isactive")
    private Boolean isactive;

    @OneToMany(mappedBy = "userid", fetch = FetchType.LAZY)
    private Set<order> orders;

    public user(long ID, String accountname, String email, String pwd){
        this.setAccountname(accountname);
        this.setEmail(email);
        this.setID(0);
        this.setPwd(pwd);
        this.setIsadmin(false);
        this.setIsactive(true);
    }
    public user(){}

    public int getID() {
        return id;
    }

    public void setID(int id) {
        this.id = id;
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

    public void setIsactive(Boolean isactive) {
        this.isactive = isactive;
    }

    public boolean getIsactive(){
        return this.isactive;
    }

    @JsonIgnore
    public Set<order> getOrders(){return this.orders;}
}