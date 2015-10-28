// 《jsDOM高级程序设计》读书笔记

// 案例一
function reqisterMultiStateAnchorListeners(anchor,anchorImage,path,extension){
	//载入鼠标悬停状态的图像
	//载入过程与其余的脚本
	//异步进行
	var imageMouseOver = new Image()
	imageMouseOver.src = path + '-over' + extension;

	//当鼠标悬停时变化图像的源文件
	ADS.addEvent(anchor,'mouseover',function(W3CEvent){
		anchorImage.src = imageMouseOver.src;
	});
	//鼠标移出时将图像变换为原始文件
	ADS.addEvent(anchor,'mouseout',function(W3CEvent){
		anchorImage.src = path + extension;
	});
	//载入鼠标按下时的图像 
	var imageMouseDown = new Image()
	imageMouseDown.src = path + '-down' + extension;
	//鼠标按下时将图像变换为按下状态的源文件
	ADS.addEvent(anchor,'mousedown',function(W3CEvent){
		anchorImage.src = imageMouseDown.src;
	});
	//当鼠标放开时变化图像的源文件
	ADS.addEvent(anchor,'mouseup',function(W3CEvent){
		anchorImage.src = imageMouseOver.src;
	});
	
}

function initMultiStateAnchors(W3CEvent){
	//查找页面中所有的锚
	var anchors = ADS.getElementsByClassName('multiStateAnchor','a',document);
	//循环遍历列表中的所有锚元素
	for (var i = 0; i < anchors.length; i++) {
		var anchorImage = anchors[i].getElementsByTagName('img')[0];
		if (anchorImage) {
			//如果存在图像元素，解析其原路径
			var extensionIndex = anchorImage.src.lastIndexOf('.');
			var path = anchorImage.src(0,extensionIndex);
			var extension = anchorImage.src.substring(
				extensionIndex,
				anchorImage.src.length);

			//添加各种鼠标处理程序
			//同时预先加载图像
			registerMultiStateAnchorListeners(
				anchors[i],
				anchorImage,
				path,
				extension
				);
		};
	};
}

//当文档载入完成时修改具有特定标记的锚
ADS.addEvent(window,'load',initMultiStateAnchors);



// 2.1  对象中包含什么
js中大多数对象可以分为两种类型：
1.function对象
2.Object 对象

// 2.1.1  继承

//创建一个person对象的实例
var person = {};
person.getName = function(){ ... }
person.getAge = function(){ ... }
//创建一个employee对象的实例
var employee = {};
employee.getTitle = function(){ ... }
employee.getSalary = function(){ ... }
//从person对象中继承方法
employee.getName = person.getName;
employee.getAge = person.getAge;


// 2.2.4 公有 私有 特权和静态成员真那么重要吗

//构造函数
function myConstructor(message){
	this.myMessage = message;

	//私有属性
	var separator =  '-';
	var myOwner = this;

	//私有方法
	function alertMessage(){
		alert(myOwner.myMessage);
	}
	alertMessage();
	//特权方法也是公有方法
	this.appendToMessage = function(string){
		this.myMessage += separator + string;
		alertMessage();
	}
	//公有方法
	myConstructor.prototype.clearMessage = function(string){
		this.myMessage = '';
	}
	//静态属性
	myConstructor.name = 'JEFF';

	//静态方法
	myConstructor.alertName = function(){
		alert(this.name);
	}


}


// 2.3 this
var sound = 'Roar';
function myOrneryBeast(){
	this.style.color = 'green';
	alert(sound);
}
function initPage(){
	var example = ADS.$('example');
	//使用事件属性方法
	example.onclick = myOrneryBeast;
	//或者使用ADS。addEvent方法
	ADS.addEvent(example,'mouseover',myOrneryBeast);
}
ADS.addEvent(window,'load',initPage)


//通过call()和apply()重新定义执行环境
function doubleCheck(){
	this.message = 'Are you sure you want to leave?';

}

doubleCheck.prototype.sayGoodbye = function(){
	return confirm(this.message);
}
initPage(){
	var clickedLink = new doubleCheck();
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		//注意不要在clickedLink.sayGoodbye后面加()
		//因为你并不想执行它
		ADS.addEvent(
			links[i],
			'click',
			ADS.bindFunction(clickedLink,clickedLink.sayGoodbye);
	};
}
ADS.addEvent(window,'load',initPage);





//3.0 DOM

// 4.0 事件
// 4.2 事件的类型:对象事件 鼠标事件 键盘事件 表单事件 W3C事件 针对浏览器的事件
// 4.2.1 对象事件
//4.2.1.1 load和unload事件
// 我们使用window对象的load事件，以便在页面载入时调用行为增强的脚本代码
function yourLoadEvent(){
	//对文档进行某些操作

}
ADS.addEvent(window,'load',yourLoadEvent)

//4.2.1.2 abort 和 error 事件
// error 事件也适用于图像对象，当向文档中添加图像时，可以用来识别图像载入错误
ADS.addEvent(window,'load',function(){
	//创建一个图像元素
	var image = document.createElement('IMG');
	//当图像载入后将其添加到文档主体
	ADS.addEvent(image,'load',function(){
		document.body.appendChild(image);
	});
	//如果载入时出错则添加相应信息
	ADS.addEvent(image,'error',function(){
		var message = document.createTextNode('The image failed to load');
		document.body.appendChild(message);
	});
	//设置图像的src属性以便浏览器取得图像
	image.setAttribute(
		'src',
		'http://advanceddomscripting.com/images/working.jpg'
		);
	//除了下面这幅图像不存在而且会发生载入错误外，与上面都相同
	var imageMissing = document.createElement('img');
	ADS.addEvent(imageMissing,'load',function(){
		document.body.appendChild(imageMissing);
	});
	ADS.addEvent(imageMissing,'error',function(){
		var message = document.createTextNode('imageMissing failed to load');
		document.body.appendChild(message);
	});
	imageMissing.setAttribute(
		'src',
		'http://advanceddomscripting.com/images/missing.jpg'
		);
});


//4.2.1.3 resize 事件
当调整浏览器窗口的大小并导致文档的视图发生改变时会发生resize事件，
//4.2.1.4 scroll 事件



// 4.2.2 鼠标移动事件
click  mouseover mousedown  

// 4.2.3 键盘事件
keydown keyup keypress


// 4.2.4 表单
1.表单的submit和reset事件
2.blur和focus事件
3.change事件



// 4.3.3  阻止事件冒泡
(function(){
	if(!window.ADS){ window['ADS'] = {} }

// 以上是库中已有的内容
function stopPropagation(eventObject){
	eventObject = eventObject || getEventObject(eventObject);
	if (eventObject.stopPropagation) {
		eventObject.stopPropagation();
	}else{
		eventObject.cancelBubble = true;

	};
}
window['ADS']['stopPropagation'] = stopPropagation;

// 以上是库中已有的内容

})();


// 4.4  注册事件
// 4，4，1 嵌入式注册模型
<a href="http://example.com" onclick="window.open(this.href); return false;">
	http://example.com
</a>
// 4，4，2 深入理解ADS.addEvent()方法
function addEvent(obj,evType,fn,useCapture){
	if (obj.addEventListener) {
		obj.addEventListener(evType,fn,useCapture);
		return true;
	}else if(obj.attachEvent){
		var r = obj.attachEvent("on"+evType,fn);
		return r;
	}else{
		alert("Handler could not be attached")
	};
}

// 4，4，3 传统的事件模型    : 定义当事件发生时你希望执行的js方法然后把这个方法指定给对象的事件侦听属性
window.onload = function(){
	var anchor = document.getElementById('example');
	anchor.onclick = function(){
		//单击事件发生时执行的代码
	}
}
// 4，4，4 Microsoft特有的事件模型   ：要在具体的对象上注册一个事件侦听器，必须首先定义一个js函数，然后使用该对象的attachEvent(event,listener)方法
//Microsoft 事件注册
function eventListener(){
	//响应单击事件的代码

}
window.attachEvent('onload',function(){
	var link = document.getElementById('example');
	link.attachEvent('onclick',eventListener);
});

// 4，4，5 W3C DOM2事件模型
// 同时包含了事件留得两个阶段以及类似方法，
//W3C 事件注册
function eventListener(){
	//响应单击事件的代码

}
window.addEventListener('load',function(W3CEvent){
	var link = document.getElementById('example');
	link.addEventListener('click',eventListener,false);
},false);



//###################### 7.0  AJAX

// AJAX化照片浏览器：(部分代码)

function updatePhote(info){
	ADS.$('previewPhoto').src = info.webHref;
	ADS.removeChildren('photoFile').appendChild(
		document.createTextNode(info.file));
	ADS.removeChildren('photoExposure').appendChild(
		document.createTextNode(info.exposure));
	ADS.removeChildren('photoFStop').appendChild(
		document.createTextNode(info.fStop));
	ADS.removeChildren('photoISO').appendChild(
		document.createTextNode(info.iso));
}
function updateGalleryList(fist){
	//按照需要修改页面
	var thumb;
	for (var i = 0; i < files.length; i++) {
		if((thumb = ADS.$('photo'+(i+1)+'Thumb'))){
			var li = ADS.$('photo'+(i+1));

			if (files[i]) {
				//用新图像更新缩略图
				thumb.src = '/source/chapter7/browser/thumbs'+files[i];
				thumb.title = 'Photo:' + files[i];
				thumb.alt = 'Photo:' + files[i];
				ADS.removeClassName(li,'noFile');
				li.getElementsByTagName('A')[0].href = '#photo/' + files[i].split('.')[0];
			}else{
				//没有缩略图故隐藏他
				thumb.src = '';
				thumb.title = '';
				thumb.alt = '';
				ADS.addClassName(li,'noFile');
				li.getElementsByTagName('A')[0].href = '';
			};
		}
	};
}
ADS.addLoadEvent(function(){
	ADS.actionPager.register('start',function(hash){
		//你想要添加的任何启动事件，，它会在载入页面且没有任何   hash 时被调用

	})；
	//照片变化侦听器
	ADS.actionPager.register(
		/photo\/([0-9a-z-]\/{0,1}$/i,
		function(hash,photo){
			//发送一个排队的ajaxRequest以取得对象
			ADS.ajaxRequest(hash,{
				//服务器返回application/json响应
				jsonResponseListener:function(response){
					//通过新列表（如果有）更新缩略图导航区
					updateGalleryList(response.currentPageFiles);
					//更新预览图
					updatePhote(response.currentPhoto);

					//更新文档标题
					document.title = 'photo Album Photo' + response.currentPhoto.file;
				}
			},'photoBrowserQueue');
		}
	);
	//页面变化侦听器
	ADS.actionPager.register(
		/page\/([0-9]+)\/{0,1}$/i,
		function(hash,page){
			//按照与照片侦听器相同的思路发送请求取的新页面信息
			ADS.ajaxRequestQueue(hash,{
				jsonResponseListener:function(response){
					updateGalleryList(response.currentPageFiles);
					updatePhote(response.currentPhoto);
					document.title = 'Photo Album Page' + response.currentPage;
				}
			},'photoBrowserQueue');
		}
		);
	//通过扫描带ajaxify类的链接启动actionPager 同时设置hash的根目录位于browser目录之后
	ADS.actionPager.init('ajaxify','/source/chapter7/browser/');
	
});


// 8.0  案例：实现带进度条的异步文件上传功能
//8.1.1 伪代码，通过为每次迭代进行技术来存储操作进度接近终点的过程
count = 200;
storeProgress('End goal is 200');
for (var i = 0; i < count;i++) {
	storeProgress ('I am working with number i. Only count-i left to go!');
	//进行某些密集型的操作
};
storeProgress('I have reached 200 and I\'m done');

//8.1.2在DOM脚本中，通过使用setInterval()和ADS.ajaxRequest()方法，周期性的检查服务器来检查这一状态

//每秒钟检查一次
var watcher = function(){
	ADS.ajaxRequestQueue('/getProgressScript/',{
		jsonResponseListener(response){
			if (response.done) {
				//你的代码
			}else{
				//更新进度条
				ADS.setStyle('progressBar',{
					'width':(response.current/response.total) + '%';
				});
				//等待1秒钟并发送另一次请求
				setInterval(watcher,1000);
			};
		}
	})
}
//初始化第一次请求
watcher();



//8.1.3   重定向表单

//8.1.4  跟踪进度条     
//addProgressBar()方法中的最后一步，就是创建表单的submit事件侦听器，
//为表单添加提交事件侦听器，用于验证表单和更新进度条
ADS.addEvent(form,'submit',function(W3CEvent){
	//再次检查输入以确保其包含正确的扩展名
	var ok = true;
	var hasFiles = false;
	for (var i = 0; (fileInput = fileInput[i]; i++) {
		if (fileInput.value.length>0) {
			hasFiles = true;
		};
		if (!verifyFileType(fileInput)) {
			//突出显示出错的文件输入元素
			if (!ADS.hasClassName(fileInput,'error')) {
				ADS.addClassName(fileInput,'error');
			};
			ok = false;
		};

	};
	if (!ok || !hasFiles) {
		//如果检查未通过则提示用户解决问题
		ADS.preventDefault(W3CEvent);
		alert('Please select some valid files.');
		return false;
	};
	//通过发出警告信息来禁用表单元素
	function warning(W3CEvent){
		ADS.preventDefault(W3CEvent);
		alert('There is an upload in progress.Please wait.');
	}
	for (var i = 0; (input = allInputs[i]); i++) {
		//input.setAttribute('disabled','disabled');
		ADS.addEvent(input,'mousedown',warning);
	};

	//创建一个函数以便在上传完成后重新启用表单  该函数将在Ajax事件侦听器内部被调用
	function clearWarnings(){
		//从表单元素移除警告侦听器
		for (var i = 0; (input = allInputs[i]); i++) {
			ADS.removeEvent(input,'mousedown',warning);
		};


		//以新ID数值更新原ID和表单  以确保下次上传不影响本次上传
		uniqueID = Math.floor(Math.random() * 100000000000);
		uniqueIDField.setAttribute('value',uniqueID);
	}

	//更新进度条
	updateProgressBar('0%','Beiginning','waiting');

	//为模拟脚本设置计数器
	var conter = 0;

	//创建一个新方法以触发一次新的进度请求
	var progressWatcher = function(){
		//使用唯一键来请求进度信息
		ADS.ajaxRequestqueue(form.action
			+ (form.action.indexOf('?') == -1 ? '?' : '&')
			+ 'key=' + uniqueID + '&sim' + (++counter),{
				//服务器端脚本将返回适当的头部信息，因此我们可以使用JSON侦听器
				jsonResponseListener:function(response){
					//检测响应以确定服务器端 脚本中是否存在错误
					if (!response) {
						//没有有效的响应
						updateProgressBar(
							'0%',
							'Invalid response from progress watcher',
							'error'
							)
						//请求完成故清除警告提示
						clearWarnings();
					}else if(response.error){
						//服务器报告了错误
						updateProgressBar('0%',response.error,'error');
						//请求完成故清除警告提示
						clearWarnings();
					}else if(response.done == 1){
						//POST请求已经完成
						updateProgressBar(
							'100%',
							'upload Complete',
							'complete'
							);
						//请求完成故清除警告提示
						clearWarnings();
						//为提供更改处理程序的用户传递新信息
						if (modificationHandle.myConstructor == function) {
							modificationHandle(response);
						};
					}else{
						//更新进度条并返回结果,由于结果是null，所以返回会简单的停止执行方法中其余的代码
						updateProgressBar(
							Math.round(response.current/response.total*100)+'%',
							response.current
							+ ' of '
							+ ' response.total '
							+ ' . '
							+ ' Uploading file ' +
							response.currentFileName,
							'uploading'
							);
						//再次执行进度监视程序
						setTimeout(progressWatcher,1000);
					};
				}
				errorListener:function(){
					//Ajax请求发生了错误  因此需要让用户知道
					updateProgressBar('0%',this.status,'error');

					//清除警告提示
					clearWarnings();
				}
			})
	}
	//开始监视...
	setTimeout(progressWatcher,1000);
});








































