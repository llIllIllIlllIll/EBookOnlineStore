
Vue.http.options.xhr = {withCredentials: true};

var app_login=new Vue({
    el:'#login',
    data:{
        accountname:"",
        pwd:""
    },
    methods:{
        login:function(){
            if(this.accountname==""||this.pwd=="")
            {
                alert("Enter Both Accountname And Password! ");
                return;
            }
            else{
                this.$http.post('http://localhost:8080/ebook/login',{accountname:this.accountname,pwd:this.pwd},
                {emulateJSON:true,withCredentials:true})
                .then(function(res){
                    console.log("请求成功");
                    this.a=res.body;
                    console.log(res);
                    if(this.a==true){
                        alert("You Have Been Successfully Logged In!");
                        window.location.href="index.html";
                    }
                    else{
                        alert("Your Account Name Or Password Is Not Correct!");
                    }
                },function(){
                    console.log('请求失败处理');
                });
            }
        }
        }
    }

)