Vue.component('cart-item',{
    props:['bookname','isbnnum','price','num','imgurl'],
    template:'<tr>\
                <td class="product-thumb">\
                <img width="80px" height="auto" :src="imgurl" alt="image description"></td>\
                <td class="product-details">\
                    <h3 class="title">{{bookname}}</h3>\
                    <span class="add-id"><strong>ISBN:</strong>{{isbnnum}}</span>\
                    <span><strong>Price: </strong>${{price}} </span>\
                    <span class="status active"><strong>Num</strong>{{num}}</span>\
                </td>\
                <td class="product-category"><span class="categories">IT</span></td>\
                <td class="action" data-title="Action">\
                    <div class="">\
                    <ul class="list-inline justify-content-center">\
                        <li class="list-inline-item">\
                            <a class="edit" href="">\
                                <i class="fa fa-clipboard"></i>\
                            </a>\
                        </li>\
                        <li class="list-inline-item">\
                            <a class="delete" href="">\
                                <i class="fa fa-trash"></i>\
                            </a>\
                        </li>\
                    </ul>\
                    </div>\
                </td>\
            </tr>'
})

var app_cart= new Vue({
    el:"#cart",
    data:{
        cart:[],temp:[],username:"BILLY"
    },
    mounted(){
        this.$http.get('http://106.12.89.107:8080/ebook/isLogin',{emulateJSON:true,withCredentials:true})
        .then(function(res){
				console.log('请求成功');
                console.log(res);
                if(res.body==false)
                {
                    alert("You Have To Log in First!");
                    window.location.href="login.html";
                }
                else{
                    alert("You Have Already Logged in.");
                }
            
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });

            this.$http.get('http://106.12.89.107:8080/ebook/name',{emulateJSON:true,withCredentials:true})
            .then(function(res){
				console.log('请求成功');
                console.log(res.bodyText);
                this.username=res.bodyText;
                
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
            
        this.$http.get('http://106.12.89.107:8080/orders/getCart',{emulateJSON:true,withCredentials:true})
        .then(function(res){
                console.log('请求成功');
                console.log(res);
                Object.assign(this.temp,res.data);
                for(var i=0;i<this.temp.length;i++)
                {
                    this.cart.push(this.temp[i]);

                }
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });

    },
    methods:{
        makeOrder:function(){
        this.$http.get('http://106.12.89.107:8080/orders/makeOrder',{emulateJSON:true,withCredentials:true})
        .then(function(res){
                console.log('请求成功');
                console.log(res);
                if(res.body==true){
                    alert("Your Order Has Been Made Successfully.");
                    window.location.href="account-all-orders.html";
                }
                else{
                    alert("You Cart Is Empty!");
                    window.location.href="browse.html";
                }
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
        }
    }
})
