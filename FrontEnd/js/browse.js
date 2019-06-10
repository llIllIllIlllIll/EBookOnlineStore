//Vue components

Vue.component('book-info',{
    props:['title','author','imgurl','isbnnum','storage','bookid'],
    template:'<li class="booklist"><div class="bookinfo"><div class="product-item bg-light">\
	<div class="card">\
		<div class="thumb-content">\
			<div class="price">left:{{storage}}</div>\
			<a v-bind:href="[\'book-detail.html?bookid=\'+bookid]">\
				<img style="max-width:200px;max-height:200px;" \
				class="card-img-top img-fluid" :src="imgurl" alt="Card image cap">\
			</a>\
		</div>\
		<div class="card-body">\
		    <h4 class="card-title"><a href="">{{title}}</a></h4>\
		    <ul class="list-inline product-meta">\
		    	<li class="list-inline-item">\
		    		<a href=""><i class="fa fa-folder-open-o"></i>IT</a>\
		    	</li>\
		    	<li class="list-inline-item">\
		    		<a href="">{{author}}</a>\
		    	</li>\
		    </ul>\
		    <p class="card-text"></p>\
		    <div class="product-ratings">\
		    	<ul class="list-inline">\
		    		<li class="list-inline-item selected"><i class="fa fa-star"></i></li>\
		    		<li class="list-inline-item selected"><i class="fa fa-star"></i></li>\
		    		<li class="list-inline-item selected"><i class="fa fa-star"></i></li>\
		    		<li class="list-inline-item selected"><i class="fa fa-star"></i></li>\
		    		<li class="list-inline-item"><i class="fa fa-star"></i></li>\
		    	</ul>\
		    </div>\
		</div>\
	</div>\
</div></div></li>',
})


var app_search=new Vue({
    el:"#searchForBook",
    data:{
        searchContent:"",
    },
    methods:{
        search:function(){

            var l=app_browselist.displays.length;
            app_browselist.c=this.searchContent;
            for(var i=0;i<l;i++)
                app_browselist.displays.pop();
            if(this.searchContent=="")
            {
                for(var i=0;i<app_browselist.books.length;i++)
                {   
                    app_browselist.displays.push(app_browselist.books[i]);
                }
            }
            else{
                for(var i=0;i<app_browselist.books.length;i++)
                {   
                    if(app_browselist.books[i].bookname.toLowerCase().match(this.searchContent.toLowerCase())||
                        app_browselist.books[i].author.toLowerCase().match(this.searchContent.toLowerCase())||
                        app_browselist.books[i].isbnnum.toLowerCase().match(this.searchContent.toLowerCase()))
                        { 
							app_browselist.displays.push(app_browselist.books[i]);
						}
				}
			}

        }
    }
})


var app_browselist=new Vue({
    el:"#browseList",
    data:{
		browse_state:true,
        books:[],
        c:"",
        displays:[],
        type:0
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
        sort:function(){
            if(this.type==1){
                this.displays=this.displays.sort(comparator1);
            }
            else if (this.type==2){
                this.displays=this.displays.sort(comparator2);
            }
            else if (this.type==3){
                this.displays=this.displays.sort(comparator3);
            }
            else if (this.type==4){
                this.displays=this.displays.sort(comparator4);
            }
        },
        init:function(){
            for(var i=0;i<this.books.length;i++)
            {
                this.displays.push(this.books[i]);

			}
		}
    },
    computed:{
    }
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


function comparator1(a,b)
{
    return a.id-b.id;
}
function comparator2(a,b)
{
    return a.author.length-b.author.length;
}
function comparator3(a,b)
{
    return a.storage-b.storage;
}
function comparator4(a,b)
{
    return Number(a.isbnnum)-Number(b.isbnnum);
}

