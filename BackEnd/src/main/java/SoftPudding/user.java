package SoftPudding;

import javax.persistence.*;

@Entity
@Table (name = "user")
public class user {
    @Id
    private long ID;

    @Column(name = "accountname")
    private String accountname;

    @Column(name = "email")
    private String email;

    @Column(name = "pwd")
    private String pwd;

    @Column(name = "isadmin")
    private Boolean isadmin;

    user(long ID, String accountname, String email, String pwd){
        this.setAccountname(accountname);
        this.setEmail(email);
        this.setID(0L);
        this.setPwd(pwd);
        this.setIsadmin(false);
    }

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