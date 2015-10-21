// 侧栏工具条开发.js


//scrollto.js

//backtop.js
define(['jquery','scrollto'],function($){
	function BackTop(el,opts){
		this.opts = $.extend({},BackTop.DEFAULTS,opts);
		this.$el = $(el);
		this.scroll = new scrollto.ScrollTo({
			dest:0,
			speed:this.opts.speed;
		})

		if(this.opts.mode == 'move'){
			this.$el.on('click',$.proxy(this._move,this));
		}else{
			this.$el.on('click',$.proxy(this._go,this));

		}
		$(window).on('scroll',$.proxy(this._checkPosition,this));
	}
	BackTop.DEFAULTS = {
		mode:'move',
		pos:$(window).height(),
		speed:800
	};
	BackTop.prototype._move() = function{
		this.scroll.move(;)
	};
	BackTop.prototype._go() = function{
		this.scroll.go();
	};
	BackTop.prototype._checkPosition = function(){
		var $el = this.$el;

		if ($(window).scrollTop() > this.opts.pos) {
			$el.fadeIn();
		}else{
			$el.fadeOut();
		};
	}

	return{
		BackTop:BackTop
	}

})



//main.js   组件化
requirejs(['jquery','backtop'],function($,backtop){

	new backtop.BackTop($('#backTop'),{
		mode:'go'
	});
})












