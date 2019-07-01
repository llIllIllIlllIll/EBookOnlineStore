Vue.component('list-item',{
    props:['bookid','bookname','isbnnum','price','storage','imgurl','index','author'],
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
        },
        modifyBook:function(i){
            app_bm.showOverlay=true;
            app_bm.o_bookid=app_bm.displays[i].bookid;
            app_bm.o_author=app_bm.displays[i].author;
            app_bm.o_bookname=app_bm.displays[i].bookname;
            app_bm.o_isbnnum=app_bm.displays[i].isbnnum;
            app_bm.o_price=app_bm.displays[i].price;
            app_bm.o_storage=app_bm.displays[i].storage;
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
                <td class="product-category"><span class="categories">{{author}}</span></td>\
                <td class="action" data-title="Action">\
                    <div class="">\
                    <ul class="list-inline justify-content-center">\
                        <li class="list-inline-item">\
                            <a class="edit" href="javascript:void(0);"  @click="modifyBook(index)">\
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
        displays:[],
        searchContent:"",
        c:"",
        showOverlay:false,
        o_bookid:0,
        o_bookname:"",
        o_author:"",
        o_price:0,
        o_storage:0,
        o_isbnnum:0,
        o_file:{}
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
        },
        search:function(){
            var l=this.displays.length;
            this.c=this.searchContent;
            for(var i=0;i<l;i++)
                this.displays.pop();
            if(this.searchContent=="")
            {
                for(var i=0;i<this.books.length;i++)
                {   
                    this.displays.push(this.books[i]);
                }
            }
            else{
                for(var i=0;i<this.books.length;i++)
                {   
                    if(this.books[i].bookname.toLowerCase().match(this.searchContent.toLowerCase())||
                        this.books[i].author.toLowerCase().match(this.searchContent.toLowerCase())||
                        this.books[i].isbnnum.toLowerCase().match(this.searchContent.toLowerCase()))
                        { 
							this.displays.push(this.books[i]);
						}
				}
			}

        },
        cancelChange:function(){
            this.showOverlay=false;
        },
        submitChange:function(){
            var formdata = new FormData();

            formdata.append('bookid',this.o_bookid);
            formdata.append('bookname',this.o_bookname);
            formdata.append('author',this.o_author);
            formdata.append('isbnnum',this.o_isbnnum);
            formdata.append('price',this.o_price);
            formdata.append('storage',this.o_storage);
            formdata.append('bookcover',this.o_file);
            
            let config = {
                'Content-Type': 'multipart/form-data',
                'withCredentials': 'true',
                'emulateJSON': 'true'
            };
            this.$http.post('http://localhost:8080/books/update',formdata,config)
            .then(
                function(){
                    alert("BOOK "+this.o_bookname+" HAS BEEN UPDATED.");
                    location.reload();
                },
                function(){
                    alert("FAIL TO SUBMIT FORM.");
                }
            )
        },
        fileChange:function(event){
            this.o_file=event.target.files[0];
        }
    }
})