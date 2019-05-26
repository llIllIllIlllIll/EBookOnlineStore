Vue.component('list-item',{
    props:['bookid','bookname','isbnnum','price','storage','imgurl'],
    methods:{
        deleteBook:function(bookid){
            this.$http.get('http://localhost:8080/books/delete?bookid='+bookid,{emulateJSON:true,withCredentials:true})
            .then(
                function(res){
                    if(res.bodyText=="true"){
                        alert("Book has been successfully deleted!");
                        window.location.reload();
                    }
                    else{
                        alert("Access Refused.");
                    }
                },
                function(){
                    console.log("Fail in request: "+'http://localhost:8080/books/delete?bookid='+bookid);
                }
            )
        }
    },
    template:'<tr>\
                <td class="product-thumb">\
                <img width="80px" height="auto" style="max-height:80px" :src="imgurl" alt="image description"></td>\
                <td class="product-details">\
                    <h3 class="title">{{bookname}}</h3>\
                    <span class="add-id"><strong>ISBN:</strong>{{isbnnum}}</span>\
                    <span><strong>Price: </strong>${{price}} </span>\
                    <span class="status active"><strong>Storage</strong>{{storage}}</span>\
                </td>\
                <td class="product-category"><span class="categories">IT</span></td>\
                <td class="action" data-title="Action">\
                    <div class="">\
                    <ul class="list-inline justify-content-center">\
                        <li class="list-inline-item">\
                            <a class="edit" >\
                                <i class="fa fa-clipboard"></i>\
                            </a>\
                        </li>\
                        <li class="list-inline-item">\
                            <a class="delete" href="javascript:void(0);"  @click="deleteBook(bookid)">\
                                <i class="fa fa-trash"></i>\
                            </a>\
                        </li>\
                    </ul>\
                    </div>\
                </td>\
            </tr>'
})

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

var app_bm= new Vue({
    el:"#bm",
    data:{
        books:[],
        displays:[]
    },
    mounted(){
        this.$http.get('http://localhost:8080/books/all').then(function(res){
            console.log('请求成功');
            Object.assign(this.books,res.data);
            console.log(this.books);
            this.init();
        },function(){
            console.log('请求失败处理');
        });
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
        init:function(){
            for(var i=0;i<this.books.length;i++)
            {
                this.displays.push(this.books[i]);

			}
		}
    }
})