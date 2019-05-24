var app_main= new Vue({
    el:"#main",
    data:{
        adminname:"BILLY",
    },
    mounted(){
        //firstly check is login?
        this.$http.get('http://localhost:8080/ebook/isLogin',{emulateJSON:true,withCredentials:true})
        .then(function(res){
            //login request success
				console.log('请求成功:http://localhost:8080/ebook/isLogin');
                if(res.body==false)
                {
                    alert("You Have To Log in First!");
                    window.location.href="login.html";
                }
                else{
                    //get adminname
                    this.$http.get('http://localhost:8080/ebook/name',
                    {emulateJSON:true,withCredentials:true})
                        .then(function(res){
                            //name request success
				            console.log('请求成功:http://localhost:8080/ebook/name');
                            this.adminname=res.bodyText;
                            this.$http.get('http://localhost:8080/ebook/isadmin',{emulateJSON:true,withCredentials:true})
                            .then(
                                //ONLY ADMIN ACCOUNTS CAN OPERATE ON THIS PAGE
                                function(res){
                                    console.log('请求成功:http://localhost:8080/ebook/isadmin');
                                    console.log(res);
                                    if(res.bodyText=="false"){
                                        alert("YOU ARE NOT A VALID ADMIN. ACCESS REFUSED.");
                                        window.location.href="login.html";
                                    }
                                },
                                function(){
                                    console.log('请求失败:http://localhost:8080/ebook/isadmin');
                                    alert("CONNECTION ERR.");
                                    window.location.href="login.html";
                                }
                            )


                        },function(){
                            //name request failed
                            console.log('请求失败处理');
                            alert("CONNECTION ERR.");
                            window.location.href="login.html";
                        });
                }
            
            },function(){
                //login failed
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
                window.location.href="login.html";
            });
            
    },
    methods:{
    }
    
})

var app_rd= new Vue({
    el:"#rd",
    data:{
        bookname:"",author:"",isbnnum:"",
        price:0,storage:0,file:{},
    },
    mounted(){
    },
    methods:{
        logout:function(){
            this.$http.get("http://localhost:8080/ebook/logout",{emulateJSON:true,withCredentials:true})
            .then(function(){
                console.log("You have logged out.");
                window.location.href="index.html";
            },function(){
                console.log("NET ERR.");
            });
            
        },
        submitform:function(){
            var formdata = new FormData();
            formdata.append('bookname',this.bookname);
            formdata.append('author',this.author);
            formdata.append('isbnnum',this.isbnnum);
            formdata.append('price',this.price);
            formdata.append('storage',this.storage);
            formdata.append('bookcover',this.file);
            let config = {
                'Content-Type': 'multipart/form-data',
            };
            this.$http.post('http://localhost:8080/books/insert',formdata,config)
            .then(
                function(){
                    alert("BOOK "+this.bookname+" HAS BEEN INSERTED.");
                    window.location.href="admin-book-insert.html";
                },
                function(){
                    alert("FAIL TO SUBMIT FORM.");
                }
            )
        },
        fileChange:function(event){
            this.file=event.target.files[0];
        }
    }
})