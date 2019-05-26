let chart;

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

var app_data= new Vue({
    el:"#data",
    data:{y1:"",y2:"",m1:"",m2:"",d1:"",d2:"",orders_meta:[],orders:[],labels:[],values:[]},
    mounted(){
        this.$http.get("http://localhost:8080/orders/allorders",{withCredentials:true,emulateJSON:true})
        .then(
            function(res){
                var ct =0;
                Object.assign(this.orders_meta,res.data);
                console.log(this.orders_meta);
                this.orders.push(this.orders_meta[0]);
                for(var i=1;i<this.orders_meta.length;i++){
                    if(this.orders_meta[i].orderdate==this.orders_meta[i-1].orderdate)
                        this.orders[ct].allcost+=this.orders_meta[i].allcost;
                    else{
                        this.orders.push(this.orders_meta[i]);
                        ct++;
                    }
                }
                this.makeChart();
            },
            function(){
                alert("CONNECTION ERR.");
            }
        )
    },
    methods:{
        makeChart:function(){
            var max= 0;
            for(var i=0; i<this.orders.length;i++){
                this.labels.push(this.orders[i].orderdate);
                this.values.push(this.orders[i].allcost);
                max = this.orders[i].allcost> max? this.orders[i].allcost:max;
            }
            chart = new Chart( "#chart", { // or DOM element
                data: {
                  labels: this.labels,
                
                  datasets: [
                    {
                      label: "Some Data", type: 'bar',
                      values: this.values
                    }  
                  ],
                
                  
                  yRegions: [{ label: "Region", start: 0, end: max }]
                },
                
                title: "Sales Chart",
                type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
                height: 250,
                colors: ['green']
                });
        }
    }
})

       