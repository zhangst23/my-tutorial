define(function(require, exports, module){
	return;
    require('common');
    var store=require('store');
	var timer=null;
	var currIndex=-1;
	var isAjax=0;
	var iskeyword="";
	var nextPage=0;
	//var oldPage=0;

	var resetLoading=function(){
		$(".bg-loading").css({height:$(".course-list").height()})
	}
	var showLoading=function(){
		//var top=($(window).height()-80)/2;

		var h=$(".course-list").height()+5

		if($(".bg-loading").length>0){
			//$(".loading").css({
			//	top:top
			//})
			$(".bg-loading").css({
				height:h
			}).fadeIn(100)
		}else{
			$(".js-course-list").prepend('<div class="bg-loading"></div>')
			$(".bg-loading").css({
				height:h
			}).fadeIn(100)

			//$(".loading").css({
			//	top:top
			//})
		}

	}

	var hideLoading=function(){
		isAjax=0
		setTimeout(function(){
			$(".bg-loading").fadeOut(300);
		},0)
	}




	var setFixed=function(){
	    var t=$(document).scrollTop();
	    if(t>80){
	    	$(".course-sidebar,.course-tools").addClass('fixed')
	    	$(".course-list").css({marginTop:50})
	    }else{
	    	$(".course-sidebar,.course-tools").removeClass('fixed')
	    	$(".course-list").css({marginTop:0})
	    }

		var h=$(document).height()
		var wh=$(window).height()
		if(t>=h-wh-30){
			if(nextPage>0){
				loadData(nextPage);
			}
		}
	}

	if(window.history.pushState){
		window.addEventListener('popstate', function(e){
			var state = e.state;
			if(state){
				window.location=(state.url)
			}
		}, false);
	}
	var loadData=function(page,keyword){
		if(isAjax) {
			return;
		}
		
		if(!page||page==1){
			showLoading()
			page=1
		}else{
			$(".course-list").append('<a href="javascript:void(0)" class="js-next btn-next btn-loading"></a>')
		}

		var data={
			cat_id:0,
			lange_id:0,
			sort:"last",
			pagesize:30,
			unlearn:0,
			page:page,
			is_easy:0
		}
		var title=$(".js-sidebar-lang .curr").text();

		var currObj=$(".course-sidebar-type .curr")
		if(currObj.length==1){
			title="<strong>"+currObj.eq(0).find("a:first").text()+"</strong>";
			data.cat_id=currObj.eq(0).find("a:first").data("id");
		}else if(currObj.length>1){
			title="<strong>"+currObj.eq(0).find("a:first").text()+"</strong> \\ "+currObj.eq(1).find("a:first").text()
			data.lange_id=currObj.eq(1).find("a:first").data("id");
		}

		data.sort=$(".js-tool-sort .curr").attr("data-id");
		data.unlearn=$(".js-tool-learn").attr("data-checked");
		data.is_easy=$(".js-sidebar-level .curr a").attr("data-id");


		if(title=="全部") {
			title+="课程";
		}else{
			title='<span>'+title+'</span>'
		}
		
		$(".course-tools h2").html(title)
		isAjax=1;
		$.ajax({
			url:"/course/ajaxlist",
			data:data,
			method:"post",
			dataType:"json",
			success:function(res){
				nextPage=0
				isAjax=0
				var data=res.list
				var str='<ul>'; 
				if(data.length>0){
					str='<ul>';
					for(k in data){
						str+='<li>';
						var tHour,temp,dur;
						dur=+data[k].duration;
						temp=Math.floor((dur%3600)/60)+"分";
						(tHour=Math.floor(dur/3600))>0&&(temp=tHour+"小时"+temp);	

						if(data[k].isapplied){
							str+='<a href="/learn/'+data[k].id+'"><div class="course-list-img"><img width="280" height="160" alt="'+data[k].name+'" src="http://img.mukewang.com/'+data[k].pic+'-300-170.jpg">';
							str+='<span>你已参加本课程</span>';
						}else{
							str+='<a href="/view/'+data[k].id+'"><div class="course-list-img"><img width="280" height="160" alt="'+data[k].name+'" src="http://img.mukewang.com/'+data[k].pic+'-300-170.jpg">';
						}
						str+="</div>";
						var _leng=36,_topicon=""
						if(data[k].istop=="1"){
							_leng=30
							_topicon=" class='topicon'"
						}

						if(data[k].name.strLen()>_leng){
							str+='<h5><span '+_topicon+'>'+data[k].name.subCHStr(0,_leng-2)+'..</span></h5>';
						}else{
							str+='<h5><span '+_topicon+'>'+data[k].name+'</span></h5>';
						}
						var isnew=data[k].is_green?" new":"";

						var updatestr="";
						var timestr="";

						if(data[k].finished=="1"){
							updatestr='共'+data[k].max_chpter+'章'+data[k].section_num+"节";
							timestr="更新完毕"
						}else{
							if(data[k].max_chpter&&data[k].max_section){
								updatestr='更新至'+data[k].max_chpter+'-'+data[k].max_section;
							}else{
								updatestr="近期开放"
							}
							timestr=data[k].update_time_str+"更新"	
						}

						
						str+='<div class="intro"><p>'+data[k].short_description.subCHStr(0,100)+'</p><span class="l'+isnew+'">'+updatestr+'</span> <span class="r">课程时长：'+temp+'</span></div>';

						str+='<div class="tips"><span class="l'+isnew+'">'+timestr+'</span> <span class="r">'+data[k].numbers+'人学习</span></div>';
						str+='</a></li> ';
					}
					
					str+="</ul>";


				}else{
					str= page == 1 ? '<div class="nodata"></div>' : '';
				}
				

				if(page==1){
					if($(".js-course-list").html()==""){
						setTimeout(function(){
							$(".js-course-list").html(str)
						},0)
					}else{
						setTimeout(function(){
							$(".js-course-list").html(str)
							resetLoading()
						},100)
					}
					$(".js-next").remove();
					if(res.nextPage){
						nextPage=page*1+1
					}
					$("html,body").animate({scrollTop:0},200);	
				}else{
					setTimeout(function(){

						if(res.nextPage){
							nextPage=page*1+1
							//str+='<a href="javascript:void(0)" data-page="'+(page*1+1)+'" class="btn-next js-next">加载更多</a>';
						}

						$(".js-next").remove();
						$(".js-course-list").append(str)
					},500)
				}
				
			},
			error:function(){
				isAjax=0
				setTimeout(function(){
					$(".js-next").remove();
				},500)
				hideLoading()
			},
			complete:function(){
				isAjax=0
				hideLoading()
			}

		});
	}

	var getQueryString=function(name) {
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    	var r = window.location.search.substr(1).match(reg);
    	if (r != null) return unescape(r[2]); return null;
    }

    var timer,timer1,timer2,point=[];
    var checkPoint=function(){
		function get(a, b) {
			return (b.y - a.y)/(b.x - a.x)
		}
		var obj=$(".course-sidebar-type")
		var p=obj.offset(),
		f = {
			x: p.left + obj.outerWidth(),
			y: p.top + obj.outerHeight()
		};


		if (p2 = point[point.length - 1], p1 = point[0], !p2) return 0;
		if (p1.x < p.left || p1.x > f.x || p1.y < p.top || p1.y > f.y) return 0;


		if(get(p1,p2)<1.732){
			if(p2.y>p1.y&&p2.x>p1.x){

				return 1;
			}
		}
		return 0;
    }



	var bindEvent=function(){
		$(document).mousemove(function(a) {
				point.push({
					x: a.pageX,
					y: a.pageY
				}),
				point.length > 3 && point.shift()
			})

		$(".course-sidebar-type").on("mouseenter",
				function() {
					clearTimeout(timer2)
			}).on("mouseleave",
				function() {
					timer2= setTimeout(function() {
						$(".course-category").removeClass('hover')
						$(".course-category-sort").hide();
					})
			})

		$(".course-sidebar-type a").on("click",function(){
			var obj=$(this);
			$(".course-sidebar-type li").removeClass('curr');
			obj.parents("li").addClass('curr');

			$(".dot-sidebar-curr").animate({top: obj.parents(".course-category").index()*60},300);

			$(".course-category-sort").hide()
			if(window.history.pushState){
				window.history.pushState({url:obj.attr("href")},"",obj.attr("href"));
			}
			$(".js-sidebar-level dd").removeClass('curr').eq(0).addClass('curr')
			loadData();
        	return false;
		})

		var timer3;
		$(".course-filter").on("mouseenter",function(){
			clearTimeout(timer3);
			$(this).addClass('hover').find('.course-sidebar-filter').show()
		}).on("mouseleave",function(){
			var _this=this
			timer3=setTimeout(function(){
				$(_this).removeClass('hover').find('.course-sidebar-filter').hide()
			},200)
			
		})


		$(".course-category").on("mouseenter",function(){
			var _this=$(this)
			var _hover=function(){
				$(".course-category").removeClass('hover')
				$(".course-category-sort").hide();
				_this.addClass('hover')
				_this.find(".course-category-sort").show()				
			}

			timer = setTimeout(function() {
				if(checkPoint(_this)==0){
					_hover();
					clearTimeout(timer1)
				}
			},10)

			timer1 = setTimeout(function() {
				_hover()
			},1000)
		}).on("mouseleave",function(){
			clearTimeout(timer)
			clearTimeout(timer1)
		})

		$(".js-tool-learn").on("click",function(){
			var obj=$(this);
			
			if(obj.attr("data-checked")=="1"){
				obj.attr("data-checked","0").removeClass('course-tools-checked');
				//store.set('unlearn', '0')
			}else{
				obj.attr("data-checked","1").addClass('course-tools-checked');
				//store.set('unlearn', '1')
			}
			loadData();
        	return false;
		})

		$(".js-sidebar-level a").on("click",function(){
			$(this).parents("dd").addClass('curr').siblings().removeClass('curr');
			loadData();
		})

		$(".js-tool-sort a").on("click",function(){
			var index=$(this).parent("li").index()
			$(".dot-tool-curr").animate({right: 180-index*100},300);
			$(this).addClass('curr').parent().siblings().find("a").removeClass('curr');
			loadData();
			store.set('sort', index)
		})

		$(".js-course-list").on("click",".js-next",function(){
			$(this).addClass('btn-loading')
			loadData($(this).attr("data-page"))
		})



		//bindDefaultData()

		$(window).scroll(setFixed)
		setFixed();
		loadData();
	}
	bindEvent()

});
