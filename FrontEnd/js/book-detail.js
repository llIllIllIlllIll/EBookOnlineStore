Vue.component('comment',{
    props:['userid','commenttime','content','sec_comments'],
    template:
    '<div><p style="font-size: 20px;">{{content}}</p>\
     <p style="text-align: right">Posted by User {{userid}} on {{commenttime}}</p>\
     <div is="sec-comment" v-for=" (c,index) in sec_comments" v-bind:userid="c.userid"\
        v-bind:key="index" v-bind:commenttime="c.commenttime" v-bind:content="c.content"\
        v-bind:f_comments="c.f_comments" v-bind:res_userid="userid"></div></div>',
})

Vue.component('sec-comment',{
    props:['userid','commenttime','content','f_comments','res_userid'],
    template:
    '<div><p style="font-size: 18px;margin-left: 30px;">Reply User{{res_userid}}: {{content}}</p>\
     <p style="text-align: right;">Posted by User {{userid}} on {{commenttime}}</p>\
     <div is="sec-comment" v-for=" (c,index) in f_comments" v-bind:userid="c.userid"\
        v-bind:key="index" v-bind:commenttime="c.commenttime" v-bind:content="c.content"\
        v-bind:f_comments="c.f_comments" v-bind:res_userid="userid"></div></div>',
})

var app_main=new Vue({
    el:"#main",
    data:{
        isLoggedIn:false,
		username:null,
		isadmin:false
    },
    mounted(){
        this.$http.get('http://localhost:8080/ebook/isLogin',{emulateJSON:true,withCredentials:true})
        .then(function(res){
				console.log('请求成功');
                console.log(res);
                if(res.body==false)
                {
                    this.isLoggedIn=false;
                    return ;
                }
                else{
                    this.isLoggedIn=true;
                    this.$http.get('http://localhost:8080/ebook/name',{emulateJSON:true,withCredentials:true})
                    .then(function(res){
                        console.log('请求成功');
                        console.log(res.bodyText);
						this.username=res.bodyText;
						//check isadmin
						this.$http.get('http://localhost:8080/ebook/isadmin',{emulateJSON:true,withCredentials:true})
                            .then(
                                function(res){
                                    console.log('请求成功:http://localhost:8080/ebook/isadmin');
                                    console.log(res);
                                    if(res.bodyText=="false"){
                                        this.isadmin=false;
                                    }
                                    else{
                                        this.isadmin=true;
                                    }
                                },
                                function(){
                                    console.log('请求失败:http://localhost:8080/ebook/isadmin');
                                    alert("CONNECTION ERR.");
                                    window.location.href="login.html";
                                }
                            )
                        
                    },function(){
                        console.log('请求失败处理');
                        alert("CONNECTION ERR.");
                    });             
                }
            
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
    }
})

var app_book=new Vue({
    el:"#bookdetail",
    data:{
        book:{},
        bookid:0,
        bookname:"",
        author:"",
        price:"",
        authorbirthday:"",
        authorcompliments:"",
        imgurl:"",
        meta:[],
        comments:[]
    },
    mounted(){
        this.bookid = getQueryStringByName("bookid");
        this.$http.get('http://localhost:8080/books/getbook?bookid='+this.bookid).then(function(res){
				console.log('请求成功');
				Object.assign(this.book,res.data);
                console.log(this.book);
                this.bookname=this.book.bookname;
                this.author=this.book.author;
                this.imgurl=this.book.imgurl;
                this.price=this.book.price;
                this.authorcompliments="1970-01-01";
                this.authorcompliments=this.author+" is a computer programmer, author and consultant. His best known works are Thinking in Java and Thinking in C++, aimed at programmers wanting to learn the Java or C++ programming languages, particularly those with little experience of object-oriented programming. Eckel was a founding member of the ANSI/ISO C++ standard committee.";
            },function(){
                console.log('请求失败处理');
            });
            this.$http.get('http://localhost:8080/books/comments?bookid='+this.bookid).then(function(res){
				console.log('请求成功');
                Object.assign(this.meta,res.data);
                for(var i=0;i<this.meta.length;i++){
                    this.comments.push(this.meta[i]);
                }
            
                
                console.log(this.comments);
            },function(){
                console.log('请求失败处理');
            });
    },
    methods:{
        addToCart:function(bookid){
			this.$http.get('http://localhost:8080/ebook/isLogin',{emulateJSON:true,withCredentials:true})
        	.then(function(res){
				console.log('请求成功');
                console.log(res);
                if(res.body==false)
                {
                    alert("You Have To Log in First!");
                    window.location.href="login.html";
                }
                else{
					
					this.$http.get('http://localhost:8080/orders/addToCart?bookid='+bookid,{emulateJSON:true,withCredentials:true})
					.then(function(res){
						console.log("请求成功");
						if(res.body==true){
							alert("Book "+bookid+" has been added to your shopping cart!");
							window.location.href="browse.html";
						}
						else{
							alert("failed.");
						}
					},function(){
						console.log('请求失败处理');
					});

                }
            
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
        },
    
        
    }
})

function getQueryStringByName(name){ 
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i")); 
    if(result == null || result.length < 1){ 
    return ""; 
    }
    return result[1]; 
}  