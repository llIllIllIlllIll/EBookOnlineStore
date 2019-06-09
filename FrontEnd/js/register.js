import Vue from './vue.js';
import VueResource from 'vue-resource';
Vue.use(VueResource);

var app_input=new Vue({
    el:'#inputarea',
    data:{
        accountname:"",
        email:"",
        pwd:"",
        pwd2:"",
        a:true,
    },
    methods:{
        reg:function(){
            var EmailReg = /\w*@\w*\.\w+/;
            if(this.accountname==""||this.email==""||this.pwd==""||this.pwd2=="")
            {
                alert("ALL INFORMATION MUST BE FILLED IN!");
                return;
            }
            if(EmailReg.test(this.email)==false){
                alert("PLEASE ENTER A VALID EMAIL ADDRESS!");
                this.email="";
                return;
            }
            if(this.pwd==this.pwd2){
                this.$http.get('http://localhost:8080/ebook/exist?accountname='+this.accountname)
                .then(function(res){
                    console.log("请求成功");
                    this.a=res.body;
                    if(this.a==true){
                        alert("ACCOUNT EXIST! PLEASE USE ANOTHER NAME!");
                    }
                    else{
                        this.$http.post('http://localhost:8080/ebook/reg',
                        {accountname:this.accountname,pwd:this.pwd,email:this.email},
                        {emulateJSON:true,withCredentials:true})
                        .then(
                            function(res){
                                console.log(res);
                                alert("YOU HAVE BEEN SUCCESSFULLY REGISTERED!");
                                window.location.href="index.html";
                            }
                        )

                    }
                },function(){
                    console.log('请求失败处理');
                });
            }
            else{
                alert("PASSWORD MUST BE THE SAME!");
                this.pwd="";
                this.pwd2="";
            }
        }
        }
    }

)