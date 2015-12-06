// Bootstrap Paginator分页插件使用示例.js

1.0     http://blog.fens.me/nodejs-bootstrap-paginator/
// 前言

// 分页功能是查询的必备功能，比如我要查询一个多于1000条记录的结果集。如果一次全部展示，不仅浪费带宽，增长等待时间，用户看到这么多的数据也会觉得的头疼。但是有了分页功能，可以根据用户的习惯，一页一页的处理少量的数据，展示少量的数据，就像是在看书一样的。

// 分页功能非常实用，但是实现起来也稍有复杂。不仅要考虑到前端的展示和传值问题，还要考虑后端面向数据的查询语句。不过我也发现了前端和后端对应的解决的方案。前端程序可以通过bootstrap-paginator项目来封装，而后端我是自己实现的。本来是准备使用mongoose-paginate项目，但他的设计过于简单，而且与bootstrap-paginator的一些传参习惯不符，自已实现其实更好控制。
目录

~1.分页前端雏形bootstrap-paginator
~2.分页后端查询mongoose
~3.分页结果返回页面(后端->前端)
~4.分页查询参数传递(前端->后端)
~5.分页完整展现
 

1. 分页前端雏形bootstrap-paginator
// 下载bootstrap-paginator：下载地址
// 解压后，把bootstrap-paginator.min.js文件复制到public/js的目录

// 如果你的项目，已经配置了bootstrap, jquery。 那么你只需要在用到分页的网页上增加一行js包的引用就可以了。
~vi view/admin/movie.html
<!DOCTYPE html>
<html lang="en">
<head>
  <link href="/css/bootstrap.min.css" rel="stylesheet" media="screen" />
  <script type="text/javascript" src="/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="/js/bootstrap-paginator.min.js"></script>
</head>
<body>
	// 代码片段 查询表单
	<form method="GET">
		...
	</form>

	// 代码片段 分页控件
	<div class="span12">
		<div id="page1"></div>
	</div>

	// 代码片段 查询结果
	<div class="span12">
		<table class="table table-hover table-striped">
			...
		</table>
	</div>

	// 代码片段 
	<script type="text/javascript">
		$(function(){
			//分页功能
			var options = {
				currentPage:2,
				totalPages:5,
				numberOfPages:5,
			}
			$('#page1').bootstrapPaginator(options);
		})
	</script>

</body>
</html>



2. 分页后端查询mongoose

// 使用mongoose访问mongodb，在 Mongoose使用案例–让JSON数据直接入库MongoDB 一文中已经讲过。

// 我们构建分布查询的DAO。

// 这里Movie是model类型，没有用到entity。直接通过model做的分页查询。
// 分页查询是二步查询，第一步查询结果集数据，第二步查询总记录
// 通过skip,limit进行分页。（关于skip的效率问题，10W以下的记录，skip性能是可以接受的，10w以上的记录需要根据排序的字段，通过索引定位查询，这个概念以后再讲。）
// 排序功能默认用插入时间倒叙：sort(‘-create_date’)
// 查询参数：

// q，查询条件
// col，数据返回字段
// pageNumber，当前是第几页，如果不存在默认为第1页
// resultsPerPage，每页多少条记录
// 分页的返回值

// null：空错误，因为错误已经通过if处理了
// pageCount：一共有多少页
// results：数据结果集

~ vi model/Movie.js
var Movie = mongodb.mongoose.model("Movie",MovieSchema);
var MovieDAO = function(){};

MovieDAO.prototype.findPagination = function(obj,callback){
	var q=obj.search||{}
	var col= obj.columns;

	var pageNumber=obj.page.num||1;
	var resultsPerPage=obj.page.limit||10;

	var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
	var query = Movie.find(q.col).sort('-create_date').skip(skipFrom).limit(resultsPerPage);

	query.exec(function(error,results){
		if (error) {
			callback(error,null,null);
		}else{
			Movie.count(q,function(error,count){
				if (error) {
					callback(error,null,null);
				}else{
					var pageCount = Math.ceil(count / resultsPerPage);
					calback(null,pageCount,results);
				};
			})
		};
	});
}



3. 分页结果返回页面(后端->前端)

// 传参数到页面：page对象

// limit:5，每页限制5条记录
// num:1，查询的页面
// pageCount，一共有多少页
// size，当前页面有多少条记录
// numberOf，分页用几个标签显示

~ vi routes/moive.js

exports.movie = function(req,res){

	var search = {};
	var page = {limit:5,num:1};

	//查看哪页
	if (req.query.p) {
		page['num'] = req.query.p<1?1:req.query.p;
	};

	var model = {
		search:search,
		columns:'name alias director publish images.coverSmall create_date type deploy',
		page:page
	};

	Movie.findPagination(model,function(err,pageCount,list){
		page['pageCount'] = pageCount;
		page['size'] = list.length;
		page['numberOf'] = pageCount>5?5:pageCount;

		return res.render('admin/movie',{
			title:'电影|管理|movie.me',
			page:'admin',nav:'admin.movie',
			movieList:list,
			page:page
		})
	})




}


4. 分页查询参数传递(前端->后端)

// 前端向后端：参数传递过程

// 通过javascript，从页面向控制器传参数p.
// 通过composeUrlParams函数，封装原表单的查询参数
// 通过pageUrl函数，拼接带分布的url请求

// 后端向前端：参数传递过程

// 如果page1的div增加自定义属性
// 在页面渲染时，通过js解析div增加自定义属性，赋值给bootstrap-paginator控件

~ vi view/admin/moive.html

//修改分页的div，增加自定义的属性
<div class="span12">
	<div id="page1" pageCount="<%=pageCount%>" pageNum="<%page.num%>" pageSize="<%=page.size%>" pageLimit="<%=page.limit%>" numberOfPages="<%=page.numberOf%>"></div>

	<script type="text/javascript">
		$(function(){
			//获得浏览器参数
			$.extend({
				getUrlVars:function(){
					var vars = [],hash;
					var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
					for(var i = 0;i < hashes.length;i++){
						hash = hashes[i].split('=');
						vars.push(hash[0]);
						vars[hash[0]] = hash[i];
					}
					return vars;
				}
				getUrlVar:function(name){
					return $.getUrlVars()[name];
				}
			});
			//封装浏览器参数
			var composeUrlParams = function(){
				var param='';
				$.each($.getUrlVars(),function(i,item){
					if (item!='p') {
						var val=$.getUrlVar(item);
						if (val)param += "&" + item+"=" + val;
					};
				});
				return param;
			}

			//分页功能
			var page=$('#page1');
			var options = {
				currentPage:page.attr('pageNum'),
				totalPages:page.attr('pageCount'),
				numberOfPages:page.attr('numberOfPages'),
				pageUrl:function(type,page,current){
					return "admin/movie?" + composeUrlParams() + "&p=" + page;
				}
			}
			$('#page1').bootstrapPaginator(options);
		})
	</script>
</div>












// 最近做的asp.netMVC项目中需要对数据列表进行分类，这个本来就是基于bootstrap开发的后台，因此也就想着bootstrap是否有分页插件呢，或者说是基于jquery支持的分页功能，这样整体的网站后台风格便能够统一，又不用自己去写一套分页的功能。

// 首先便是要下载Bootstrap Paginator了，github上便有这个的开源项目提供下载：

// https://github.com/lyonlai/bootstrap-paginator
// 首先视图的上面应该需要引入js和css文件，主要有三个文件，分别是bootstrap的css，jquery以及Paginator的js文件。其中网上搜到，貌似jquery必须要1.8版本以上，这个我没有亲自去测试看过。于是视图的文件引用便：

<link href="css/bootstrap.css" rel="stylesheet">
<script type="text/javascript" src="js/jquery-1.8.1.js"></script>
<script type="text/javascript" src="js/bootstrap-paginator.js"></script>
// 然后，分页的功能当然是一个基于Ajax的局部刷新才能够吸引我们，当然这个便需要jquery的支持。之前自己搞的都是EasyUI的分页，这次也应该有点不同。


$(function(){

})









































