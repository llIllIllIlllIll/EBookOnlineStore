Vue.component('order-info',{
    props:['orderid','date','allcost','allbooks'],
    template:'<tr><td class="product-thumb">\
        <h3 class="title">Order-{{orderid}}</h3>\
    <td class="product-details">\
        <span class="add-id"><strong>All cost:</strong> ${{allcost}}</span>\
        <span><strong>Number: </strong>{{allbooks}} books </span>\
        <span class="status active"><strong>Remarks:</strong>None</span>\
    </td>\
    <td class="product-category"><time>{{date}}</time></td>\
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

var app_main = new Vue({
    el:"#main",
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
                    app_order.init();
                }
            
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
    }
    
})

var app_order=new Vue({
    el:"#orderlist",
    data:{orders:[],temp:[],username:"NULL"},
    methods:{
        init:function(){
            this.$http.get('http://106.12.89.107:8080/ebook/name',{emulateJSON:true,withCredentials:true})
            .then(function(res){
				console.log('请求成功');
                console.log(res.bodyText);
                this.username=res.bodyText;
                
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });

            this.$http.get('http://106.12.89.107:8080/orders/all',{emulateJSON:true,withCredentials:true})
            .then(function(res){
				console.log('请求成功');
                console.log(res.body);
                Object.assign(this.temp,res.body);
                for(var i=0;i<this.temp.length;i++)
                {
                    this.orders.push(this.temp[i]);

                }
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
        }
    }
})