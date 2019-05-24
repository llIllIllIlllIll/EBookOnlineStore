Vue.component('card',{
    props:['title','imgurl','author'],
    template:'<div class="col-sm-12 col-lg-4">\
    <!-- product card -->\
    <div class="product-item bg-light">\
        <div class="card">\
            <div class="thumb-content">\
                <!-- <div class="price">$200</div> -->\
                <a href="">\
                    <img class="card-img-top img-fluid" :src="imgurl" alt="Card image cap"  style="width:300px;height:300px">\
                </a>\
            </div>\
            <div class="card-body">\
                <h4 class="card-title"><a href="">{{title}}</a></h4>\
                <ul class="list-inline product-meta">\
                    <li class="list-inline-item">\
                        <a href=""><i class="fa fa-folder-open-o"></i>IT</a>\
                    </li>\
                    <li class="list-inline-item">\
                        <a href=""></i>Author:{{author}}</a>\
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
    </div>\
</div>'
})
var app_pop=new Vue({
    el:"#pop"
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
                            // check is admin?
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