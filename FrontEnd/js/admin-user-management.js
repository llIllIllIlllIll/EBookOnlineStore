Vue.component('list-user',{
    props:['id','accountname','role','status'],
    methods:{
        banUser:function(userid){
            this.$http.get('http://localhost:8080/ebook/banuser?id='+userid,{emulateJSON:true,withCredentials:true})
            .then(
                function(res){
                    alert(userid+' is successfully banned.');
                    location.reload();
                },
                function(){
                    alert('FAILED TO BAN USER '+userid);
                }
            )
            
            
        },
        releaseUser:function(userid){
            this.$http.get('http://localhost:8080/ebook/releaseuser?id='+userid,{emulateJSON:true,withCredentials:true})
            .then(
                function(res){
                    alert(userid+' is successfully released.');
                    location.reload();
                },
                function(){
                    alert('FAILED TO RELEASE USER '+userid);
                }
            )
            
        }
    },
    template:'<tr>\
                <td class="product-category">\
                    <h3 class="title">{{id}}</h3>\
                </td>\
                <td class="product-category"><span class="categories">{{accountname}}</span></td>\
                <td class="product-category"><span class="categories">{{role}}</span></td>\
                <td class="product-category"><span class="categories">{{status}}</span></td>\
                <td class="action" data-title="Action">\
                    <div class="">\
                    <ul class="list-inline justify-content-center">\
                        <li class="list-inline-item">\
                            <a class="edit" href="javascript:void(0);"  @click="releaseUser(id)">\
                                <i class="fa fa-clipboard"></i>\
                            </a>\
                        </li>\
                        <li class="list-inline-item">\
                            <a class="delete" href="javascript:void(0);"  @click="banUser(id)">\
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

var app_um= new Vue({
    el:"#um",
    data:{
        users:[],
        displays:[]
    },
    mounted(){
        this.$http.get('http://localhost:8080/ebook/allusers').then(function(res){
            console.log('请求成功');
            Object.assign(this.users,res.data);
            console.log(this.users);
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
            for(var i=0;i<this.users.length;i++)
            {
                this.displays.push(this.users[i]);
			}
		}
    }
})