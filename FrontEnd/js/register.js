
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
            if(this.accountname==""||this.email==""||this.pwd==""||this.pwd2=="")
            {
                alert("ALL INFORMATION MUST BE FILLED IN!");
                return;
            }
            if(this.pwd==this.pwd2&&this.pwd!=""){
                this.$http.get('HTTP://106.12.89.107:8080/ebook/exist?accountname='+this.accountname)
                .then(function(res){
                    console.log("请求成功");
                    this.a=res.body;
                    if(this.a==true){
                        alert("ACCOUNT EXIST! PLEASE USE ANOTHER NAME!");
                    }
                    else{
                        this.$http.get('HTTP://106.12.89.107:8080/ebook/reg?accountname='+this.accountname+
                        '&pwd='+this.pwd+'&email='+this.email).then(
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