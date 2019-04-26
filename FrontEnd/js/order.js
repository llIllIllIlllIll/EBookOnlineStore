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
    data:{orders:[],ori:[],username:"NULL",y1:"",y2:"",m1:"",m2:"",d1:"",d2:""},
    methods:{
        init:function(){
            this.$http.get('http://localhost:8080/ebook/name',{emulateJSON:true,withCredentials:true})
            .then(function(res){
				console.log('请求成功');
                console.log(res.bodyText);
                this.username=res.bodyText;
                
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });

            this.$http.get('http://localhost:8080/orders/all',{emulateJSON:true,withCredentials:true})
            .then(function(res){
				console.log('请求成功');
                console.log(res.body);
                Object.assign(this.ori,res.body);
                for(var i=0;i<this.ori.length;i++)
                {
                    this.orders.push(this.ori[i]);

                }
            },function(){
                console.log('请求失败处理');
                alert("CONNECTION ERR.");
            });
        },
    filt:function(){
        if(this.y1==""||this.y2==""||this.m1==""||this.m2==""||this.d1==""||this.d2=="")
        {
            var l= this.orders.length;
            for(var i=0;i<l;i++)
                this.orders.pop();
            for(var i=0;i<this.ori.length;i++)
            {
                this.orders.push(this.ori[i]);
            }
            return;
        }

        var y1=Number(this.y1),y2=Number(this.y2);
        var m1=Number(this.m1),m2=Number(this.m2);
        var d1=Number(this.d1),d2=Number(this.d2);
        var y,m,d;
        var l= this.orders.length;
        for(var i=0;i<l;i++)
            this.orders.pop();
        for(var i=0;i<this.ori.length;i++){
            var exp=new RegExp(/\d+/,"g");
            y=Number(exp.exec(this.ori[i].orderdate));
            m=Number(exp.exec(this.ori[i].orderdate));
            d=Number(exp.exec(this.ori[i].orderdate));
            if(y>y1&&y<y2){
                this.orders.push(this.ori[i]);
                continue;
            }
            else if((y==y1||y==y2)&&m>m1&&m<m2){
                this.orders.push(this.ori[i]);
                continue;
            }
            else if((y==y1||y==y2)&&(m==m1||m==m2)&&d>=d1&&d<=d2){
                this.orders.push(this.ori[i]);
                continue;
            }
        }
    }
    }
})