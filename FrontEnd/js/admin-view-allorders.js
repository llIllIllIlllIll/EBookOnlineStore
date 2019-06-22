Vue.component('list-order',{
    props:['orderid','userid','orderdate','allcost','allbooks'],
    template:'<tr>\
<td class="product-thumb">\
<h3 class="title">Order-{{orderid}}</h3>\
<td class="product-details">\
    <span class="add-id"><strong>All cost:</strong> ${{allcost}}</span>\
    <span><strong>Number: </strong>{{allbooks}} books </span>\
    <span class="status active"><strong>Remarks:</strong>None</span>\
</td>\
<td class="product-category"><time>{{orderdate}}</time></td>\
<td class="product-category">user: {{userid}}</td>\
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

var app_om= new Vue({
    el:"#om",
    data:{
        orders:[],
        displays:[],
        searchContent:""
    },
    mounted(){
        this.$http.get('http://localhost:8080/orders/allorders',{withCredentials:true,emulateJSON:true}).then(function(res){
            console.log('请求成功');
            Object.assign(this.orders,res.data);
            console.log(this.orders);
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
            for(var i=0;i<this.orders.length;i++)
            {
                this.displays.push(this.orders[i]);
			}
        },
        search:function(){
            var l=this.displays.length;
            for(var i=0;i<l;i++)
                this.displays.pop();
            if(this.searchContent=="")
            {
                for(var i=0;i<this.orders.length;i++)
                {   
                    this.displays.push(this.orders[i]);
                }
            }
            else{
                for(var i=0;i<this.orders.length;i++)
                {   
                    if(String(this.orders[i].orderid).match(this.searchContent)||
                        String(this.orders[i].userid).match(this.searchContent)||
                        this.orders[i].orderdate.match(this.searchContent))
                        { 
							this.displays.push(this.orders[i]);
						}
				}
			}

        }
    }
})