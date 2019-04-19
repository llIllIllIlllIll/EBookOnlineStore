//Vue components

Vue.component('book-info',{
    props:['title','author','imgurl','isbnnum','storage'],
    template:'<li class="booklist"><div class="bookinfo"><div class="product-item bg-light">\
	<div class="card" v-on:click="$emit(\'go\')">\
		<div class="thumb-content">\
			<div class="price">left:{{storage}}</div>\
			<a>\
				<img class="card-img-top img-fluid" :src="imgurl" alt="Card image cap">\
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
</div></div></li>'})

const Detail={
    props:['bks'],
    template:'<section class="section bg-gray">\
	<div class="container">\
		<div class="row">\
			<!-- Left sidebar -->\
			<div class="col-md-8">\
				<div class="product-details">\
					<h1 class="product-title">{{bks[0].bookname}}</h1>\
					<div class="product-meta">\
						<ul class="list-inline">\
							<li class="list-inline-item"><i class="fa fa-user-o"></i> By <a href="">{{bks[0].author}}</a></li>\
							<li class="list-inline-item"><i class="fa fa-folder-open-o"></i> Category<a href="">IT</a></li>\
						</ul>\
					</div>\
					<div id="carouselExampleIndicators" class="product-slider carousel slide" data-ride="carousel">\
						<ol class="carousel-indicators">\
							<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>\
							<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>\
							<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>\
						</ol>\
						<div class="carousel-inner">\
							<div class="carousel-item active">\
								<img class="d-block w-100" v-bind:src="bks[0].imgurl" alt="First slide">\
							</div>\
							<div class="carousel-item">\
								<img class="d-block w-100" src="images/products/products-2.jpg" alt="Second slide">\
							</div>\
							<div class="carousel-item">\
								<img class="d-block w-100" src="images/products/products-3.jpg" alt="Third slide">\
							</div>\
						</div>\
						<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">\
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>\
							<span class="sr-only">Previous</span>\
						</a>\
						<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">\
							<span class="carousel-control-next-icon" aria-hidden="true"></span>\
							<span class="sr-only">Next</span>\
						</a>\
					</div>\
					<div class="content">\
						<ul class="nav nav-pills  justify-content-center" id="pills-tab" role="tablist">\
							<li class="nav-item">\
								<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Book Details</a>\
							</li>\
							<li class="nav-item">\
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Specifications</a>\
                            </li>\
							<li class="nav-item">\
								<a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews</a>\
							</li>\
						</ul>\
						<div class="tab-content" id="pills-tabContent">\
							<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">\
								<h3 class="tab-title">Product Description</h3>\
								<p>“Thinking in Java should be read cover to cover by every Java programmer, then kept close at hand for frequent reference. The exercises are challenging, and the chapter on Collections is superb! Not only did this book help me to pass the Sun Certified Java Programmer exam; it’s also the first book I turn to whenever I have a Java question.”</p>\
								<p></p>\
								<p>“Thinking in Java should be read cover to cover by every Java programmer, then kept close at hand for frequent reference. The exercises are challenging, and the chapter on Collections is superb! Not only did this book help me to pass the Sun Certified Java Programmer exam; it’s also the first book I turn to whenever I have a Java question.”</p>\
							</div>\
							<div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">\
								<h3 class="tab-title">Product Specifications</h3>\
								<table class="table table-bordered product-table">\
								  <tbody>\
								    <tr>\
								      <td>Seller Price</td>\
                                      <td>$450</td>\
								    </tr>\
								    <tr>\
								      <td>Added</td>\
								      <td>26th December</td>\
								    </tr>\
								    <tr>\
								      <td>State</td>\
								      <td>Dhaka</td>\
								    </tr>\
								    <tr>\
								      <td>Brand</td>\
								      <td>Apple</td>\
								    </tr>\
								    <tr>\
								      <td>Condition</td>\
								      <td>Used</td>\
								    </tr>\
								    <tr>\
								      <td>Model</td>\
								      <td>2017</td>\
								    </tr>\
								    <tr>\
								      <td>State</td>\
								      <td>Dhaka</td>\
								    </tr>\
								    <tr>\
								      <td>Battery Life</td>\
								      <td>23</td>\
								    </tr>\
								  </tbody>\
								</table>\
							</div>\
							<div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">\
								<h3 class="tab-title">Book Review</h3>\
								<div class="product-review">\
							  		<div class="media">\
							  			<!-- Avater -->\
							  			<img src="images/user/user-thumb.jpg" alt="avater">\
							  			<div class="media-body">\
							  				<!-- Ratings -->\
							  				<div class="ratings">\
							  					<ul class="list-inline">\
							  						<li class="list-inline-item">\
							  							<i class="fa fa-star"></i>\
							  						</li>\
							  						<li class="list-inline-item">\
							  							<i class="fa fa-star"></i>\
							  						</li>\
							  						<li class="list-inline-item">\
							  							<i class="fa fa-star"></i>\
							  						</li>\
							  						<li class="list-inline-item">\
							  							<i class="fa fa-star"></i>\
							  						</li>\
							  						<li class="list-inline-item">\
							  							<i class="fa fa-star"></i>\
							  						</li>\
							  					</ul>\
							  				</div>\
							  				<div class="name">\
							  					<h5>Jessica Brown</h5>\
							  				</div>\
							  				<div class="date">\
							  					<p>Mar 20, 2018</p>\
							  				</div>\
							  				<div class="review-comment">\
							  					<p>\
							  						Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremqe laudant tota rem ape riamipsa eaque.\
							  					</p>\
							  				</div>\
							  			</div>\
							  		</div>\
							  		<div class="review-submission">\
							  			<h3 class="tab-title">Submit your review</h3>\
						  				<!-- Rate -->\
						  				<div class="rate">\
						  					<div class="starrr"></div>\
						  				</div>\
						  				<div class="review-submit">\
						  					<form action="#" class="row">\
						  						<div class="col-lg-6">\
						  							<input type="text" name="name" id="name" class="form-control" placeholder="Name">\
						  						</div>\
						  						<div class="col-lg-6">\
						  							<input type="email" name="email" id="email" class="form-control" placeholder="Email">\
						  						</div>\
						  						<div class="col-12">\
						  							<textarea name="review" id="review" rows="10" class="form-control" placeholder="Message"></textarea>\
						  						</div>\
                                                  <div class="col-12">\
						  							<button type="submit" class="btn btn-main">Sumbit</button>\
						  						</div>\
						  					</form>\
						  				</div>\
							  		</div>\
							  	</div>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="col-md-4">\
				<div class="sidebar">\
					<div class="widget price text-center">\
						<h4>Price</h4>\
						<p>$230</p>\
					</div>\
					<!-- User Profile widget -->\
					<div class="widget user">\
						<img class="rounded-circle" src="images/user/user-thumb.jpg" alt="">\
						<h4><a href="">{{bks[0].author}}</a></h4>\
						<p class="member-time">Bruce Eckel is president of MindView, Inc. (www.MindView.net), which provides public and private training seminars, consulting, mentoring, and design reviews in object-oriented technology and design patterns. He is the author of several books, has written more than fifty articles, and has given lectures and seminars throughout the world for more than twenty years. Bruce has served as a voting member of the C++ Standards Committee. He holds a B.S. in applied physics and an M.S. in computer engineering.</p>\
						<a href="">See all books by him</a>\
						<ul class="list-inline mt-20">\
							<li class="list-inline-item"><a href="" class="btn btn-contact">Contact</a></li>\
							<li class="list-inline-item"><a href="" class="btn btn-offer">Make an offer</a></li>\
						</ul>\
					</div>\
					<!-- Map Widget -->\
					<div class="widget map">\
						<div class="map">\
							<div id="map"></div>\
						</div>\
					</div>\
					<!-- Rate Widget -->\
					<div class="widget rate">\
						<!-- Heading -->\
						<h5 class="widget-header text-center">What would you rate\
						<br>\
						this book</h5>\
						<!-- Rate -->\
						<div class="starrr"></div>\
					</div>\
					</div>\
			</div>\
		</div>\
	</div>\
	<!-- Container End -->\
</section>'
}

//Vue router
var bks=[{title:"NULL"}];

const router =new VueRouter({
    routes:[
        {path:'/book',component:Detail,props:{bks:bks}}
    ]
})

//Vue apps
var app_rv=new Vue({
    el:'#rv'
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
                    if(app_browselist.books[i].title.toLowerCase().match(this.searchContent.toLowerCase())||
                        app_browselist.books[i].author.toLowerCase().match(this.searchContent.toLowerCase())||
                        app_browselist.books[i].isbnnum.toLowerCase().match(this.searchContent.toLowerCase()))
                        app_browselist.displays.push(app_browselist.books[i]);
                }
			}
			if(app_browselist.browse_state==false){
				app_browselist.browse_state=true;
				router.go(-1);
			}
        }
    }
})


var app_browselist=new Vue({
    router,
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
        go:function(id){
            bks.pop();
            bks.push(this.books[id-1]);
            router.push({ path: '/book'});
			console.log('go '+id);
			this.browse_state=false;
        },
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
        },
        
    },
    computed:{
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