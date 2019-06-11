let chart;

var app_main= new Vue({
    el:"#main",
    data:{
        username:"BILLY",
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
                    //get username
                    this.$http.get('http://localhost:8080/ebook/name',
                    {emulateJSON:true,withCredentials:true})
                        .then(function(res){
                            //name request success
				            console.log('请求成功:http://localhost:8080/ebook/name');
                            this.username=res.bodyText;
                        
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
    data:{y1:"",y2:"",m1:"",m2:"",d1:"",d2:"",orders_meta:[],orders:[],labels:[],values:[],username:""},
    mounted(){
        this.$http.get("http://localhost:8080/orders/myorders",{withCredentials:true,emulateJSON:true})
        .then(
            function(res){
                var ct =0;
                Object.assign(this.orders_meta,res.data);
                console.log(res.data);
                var len = this.orders.length;
                for(var i=0;i<len;i++)
                    this.orders.pop();
                console.log(len);
                this.orders.push(this.orders_meta[0]);
                console.log(this.orders_meta[0]);
                for(var i=1;i<this.orders_meta.length;i++){
                    if(this.orders_meta[i].orderdate==this.orders[ct].orderdate)
                    {
                        this.orders[ct].allcost+=this.orders_meta[i].allcost;               
                    }
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
            var l= this.labels.length;
            for(var i=0;i<l;i++){
                this.labels.pop();
                this.values.pop();
            }
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
                  yRegions: [{ label: "Data", start: 0, end: max }]
                },
                
                title: "Sales Chart",
                type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
                height: 250,
                colors: ['green']
                });
        },
        filtDate:function(){
            if(this.y1&&this.y2&&this.m1&&this.m2&&this.d1&&this.d2){
                if(Number(this.m1)<10)
                    this.m1="0"+this.m1;
                if(Number(this.m2)<10)
                    this.m2="0"+this.m2;
                if(Number(this.d1)<10)
                    this.d1="0"+this.d1;
                if(Number(this.d2)<10)
                    this.d2="0"+this.d2;
                var date1=this.y1+"-"+this.m1+"-"+this.d1;
                var date2=this.y2+"-"+this.m2+"-"+this.d2;
                var l = this.orders.length;
                for(var i=0;i<l;i++){
                    this.orders.pop();
                }
                console.log("orders:"+this.orders);
                l = this.orders_meta.length;
                var c = 0;
                for(var i=0;i<l;i++){
                    if(this.orders_meta[i].orderdate>=date1&&this.orders_meta[i].orderdate<=date2)
                    {
                        if(c>0){
                            if(this.orders_meta[i].orderdate==this.orders[c-1].orderdate)
                                this.orders[c-1].allcost+=this.orders_meta[i].allcost;
                            else{
                                this.orders.push(this.orders_meta[i]);
                                c++;
                                console.log(date1);
                                console.log(date2);
                                console.log(this.orders_meta[i]);
                            }
                        }
                        else{
                            this.orders.push(this.orders_meta[i]);
                            c++;
                            console.log(date1);
                            console.log(date2);
                            console.log(this.orders_meta[i]);
                        }
                    }
                }
                this.makeChart();
            }
            else{
                alert("YOU HAVE TO FILL IN BOTH YEARS MONTHS AND DAYS!");
            }
        }
    }
})

       