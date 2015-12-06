// nodejs分页类
// 改编自http://my.oschina.net/wanglihui/blog/269907，感谢原作者，我在基础上进行了二次封装

// 分页类，我放在 plugin/Paginate.js
/**
 * 分页插件类(缺少每页的显示数，listrows明天写)
 * @param page {Number} 当前页
 * @param pagesize {Number} 每页记录数
 * @param total {Number} 总记录数
 * @constructor
 */

 function Paginate(page,pagesize,total){
 	if (!page || page < 1) {
 		page = 1;
 	};
 	if (!pagesize || pagesize<1) {
 		pagesize = 20;
 	};
 	if (!total || total < 0) {
 		total = 0;
 	};
 	this.pagesize = pagesize;
 	this.total = total;
 	if (this.total%this.pagesize === 0) {
 		this.maxpage = parseInt(this.total/this.pagesize);
 	}else{
 		this.maxpage = parseInt(this.total/this.pagesize) + 1;
 	};

 	if (page>this.maxpage) {
 		this.page = this.maxpage;
 	}else{
 		this.page = page;
 	};
 }


// 当前开始的条数
Paginate.prototype.first = function(){
	var first = (this.page-1)*this.pagesize;
	if (first>this.total) {
		return(this.maxpage-1)*this.pagesize;
	};
	return first;
}

//当前页最大的条数
Paginate.prototype.last = function(){
	var last = this.first()+this.pagesize;
	if (last>this.total) {
		return this.total;
	};
	return last;
}

//上一页  @returns{number}
Paginate.prototype.prev = function(){
	if (this.page <= 1) {
		return false;
	};
	return this.page-1;
}

//下一页   @returns {*}
Paginate.prototype.next = function(){
	if (this.page >= this.maxpage) {
		return false;
	};
	return (parseInt(this.page)+1);
}

module.exports = Paginate;


//使用例子
var Paginate = require("../plugin/Paginate");
var q = req.query.q;
var paginate = new Paginate(q,10,185);
var page = paginate.page;//当前页数
var first = paginate.first(); //当前第一条
var last = paginate.last(); //当前最大条数
var maxpage = paginate.maxpage; //总页数
var pagesize = paginate.pagesize; // 每页显示数
var total = paginate.total;  //总记录数
var prev = paginate.prev();  //上一条
var next = paginate.next();  //下一条
res.json({page:page,first:first,last:last,maxpage:maxpage,pagesize:pagesize,total:total,prev:prev,next:next})












