// ionicTips知识点.js

1.0  ionic 如何保存用户登录信息 
用localstorage实现，第一次登陆的时候保存这个信息，第二次进来的时候判断localstorage有缓存的用户信息就表示登陆，没有缓存的信息就跳转到登陆页面
localStorage可以写个服务，这样其他的控制器就都可以调用了

.factory('Storage',function(){
	return{
		set:function(key,data){
			return window.localStorage.setItem(key,window.JSON.stringify(data));
		},
		get:function(key){
			return window.JSON.parse(window.locaStorage.getItem(key));
		},
		remove:function(key){
			return window.locaStorage.removeItem(key);
		}
	};
})















































