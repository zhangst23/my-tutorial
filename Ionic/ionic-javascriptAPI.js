// ionic-javascriptAPI.js
1.0    Tabs
1.1. ion-tabs
// android和ios在默认样式上有一些不同的地方，官方文档中都有说明，tab位置，$ionicConfigProvider, tabs.position(value)
// Android 默认是顶部(top)，Ios是底部 (bottom) :http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
// 如果将tab配置成统一为下方，配制方法：
var myApp = angular.module('reallyCoolApp',['ionic']);
myApp.config(function($ionicConfigProvider){
	$ionicConfigProvider.views.maxCache(5);

	//note that you can alse chain configs
	$ionicConfigProvider.tabs.position("bottom");
})


// 用法：
<ion-tabs className="tabs-positive tabs-icon-only">
	<ion-tab title="Home" icon-on="ion-ios7-filing" icon-off="ion-ios7-filing-outline">
		// Tab 1 content
	</ion-tab>
	<ion-tab title="About" icon-on="ion-ios7-clock" icon-off="ion-ios7-clock-outline">
		// Tab 2 content
	</ion-tab>
	<ion-tab title="Settings" icon-on="ion-ios7-gear" icon-off="ion-ios7-gear-outline">
		// Tab 3 content
	</ion-tab>
</ion-tabs>



// 实例
<!DOCTYPE html>
<html ng-app="ionicApp">
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width"/>
	<title>Inline Tabs</title>
	<link rel="stylesheet" href="css/ionic.min.css"/>
	<script src="js/ionic.bundle.min.js"></script>
</head>
<body ng-controller="RootCtrl">
	<ion-tabs class="tabs-icon-only tabs-positive">
		<ion-tab title="Home"
				 icon-on="ion-ios7-filing"
				 icon-off="ion-ios7-filing-outline"
				 ng-controller="HomeCtrl">

			<ion-header-bar class="bar-position">
				<button class="button button-clear" ng-click="newTask()">New</button>
				<h1 class="title">Tasks</h1>
			</ion-header-bar>

			<ion-content has-tabs="true" on-refresh="onRefresh()">
				<ion-refresher></ion-refresher>
				<ion-list scroll="false" on-refresh="onRefresh()"
						  s-editing="isEditingItems"
						  animation="fade-out"
						  delete-icon="icon ion-minus-circled">
					<ion-item ng-repeat="item in items"
							  item="item"
							  buttons="item.buttons"
							  can-delete="true"
							  can-swipe="true"
							  on-delete="deleteItem(item)"
							  ng-class="{completed:item.isCompleted}">
						{{item.title}}
						<i class="{{item.icon}}"></i>
					</ion-item>
				</ion-list>
			</ion-content>
		</ion-tab>

		<ion-tab title="About" icon-on="icon ion-ios7-clock" icon-off="icon ion-ios7-clock-outline">
			<header class="bar bar-header bar-position">
				<h1 class="title">Deadlines</h1>
			</header>
			<ion-content has-header="true">
				<h1>Deadlines</h1>
			</ion-content>
		</ion-tab>

		<ion-tab title="Settings" icon-on="icon ion-ios7-gear" icon-off="icon ion-ios7-gear-outline">
			<header class="bar bar-header bar-position">
				<h1 class="title">Settings</h1>
			</header>
			<ion-content has-header="true">
				<h1>Settings</h1>
			</ion-content>
		</ion-tab>

	</ion-tabs>

	<script id="newTask.html" type="text/ng-template">
		<div id="task-view" class="modal slide-in-up" ng-controller="TaskCtrl">
			<header class="bar bar-header bar-secondary">
				<h1 class="title">New Task</h1>
				<button class="button button-clear button-primary" ng-click="close()">Done</button>
			</header>
			<ion-content class="padding has-header">
				<input type="text" placeholder"I need to do this...">
			</ion-content>
		</div>
	</script>

</body>
</html>


// app.js
angular.module('ionicApp',['ionic'])
.controller('RootCtrl',function($scope){
	$scope.onControllerChanged = function(oldController,oldIndex,newController,newIndex){
		console.log('Controller changed',oldController,oldIndex,newController,newIndex);
		console.log(arguments);
	};
})

.controller('HomeCtrl',function($scope,$timeout,$ionicModal,$ionicActionSheet){
	$scope.items = [];

	$ionicModal.fromTemplateUrl('newTash.html',function(modal){
		$scope.settingsModal = modal;
	});

	var removeItem = function(item,button){
		$ionicActionSheet.show({
			buttons:[],
			destructiveText:'Delete Task',
			cancelText:'Cancel',
			cancel:function(){
				return true;
			},
			destructiveButtonClicked:function(){
				$scope.items.splice($scope.items.indexOf(item),1);
				return true;
			}
		});
	};

	var completeItem = function(item,button){
		item.isCompleted = true;
	};

	$scope.onReorder = function(el,start,end){
		ionic.Utils.arrayMove($scope.items,start,end);
	};

	$scope.onRefresh = function(){
		console.log('ON REFRESH');

		$timeout(function(){
			$scope.$broadcast('scroll.refreshComplete');
		},1000);
	}

	$scope.removeItem = function(item){
		removeItem(item);
	};

	$scope.newTash = function(){
		$scope.settingsModal.show();
	};

	//Crete the items
	for(var i = 0;i < 25;i++){
		$scope.items.push({
			title:'Task' + (i + 1),
			button:[{
				text:'Done',
				type:'button-success',
				onButtonClick:completeItem,
			},{
				text:'Delete',
				type:'button-danger',
				onButtonClick:removeItem,
			}]
		});
	}

})

.controller('TaskCtrl',function($scope){
	$scope.close = function(){
		$scope.modal.hide();
	}
});


1.2   ion-tab
// 作为ion-tabs的tab项，用于切换选择tab的内容，只有当tab被选中时，其对应的内容content才会存在。每个ion tab都有自己的查看历史。

// 用法
<ion-tab
	title="Tab!"
	icon="my-icon"
	href="#/tab/tab-link"
	on-select="onTabSelected()"
	on-deselect="onTabDeseleted()">
</ion-tab>

1.3. \$ionicTabsDelegate
// 是ion-tabs的一个api参数，通过这个可以选择切换不同的tab,可以通过$getByHandle 方法获取不同的tab的实例。
// 用法
<body ng-controller="MyCtrl">
	<ion-tabs>
		<ion-tab title="Tab 1">
			Hello tab 1!
			<button ng-click="selectTabWithIndex(1)">Select tab 2!</button>
		</ion-tab>
		<ion-tab title="Tab 2">Hello tab 2!</ion-tab>
	</ion-tabs>
</body>
function MyCtrl($scope,$ionicTabsDelegate){
	$scope.selectTabWithIndex = function(index){
		$ionicTabsDelegate.select(index);
	}
}

// 参数
// 1. select(index, [shouldChangeHistory]),Select the tab matching the given index.


1.4    ion-side-menus
// 是一个带有边栏菜单的容器，可以通过点击按钮或者滑动屏幕来展开菜单。在js中可以通过$ionicSideMenuDelegate来获取该组件对应的实例。
// 为了自动关闭已打开的menu，可以通过在ion-side-menu-content中的按钮或link添加menu-close样式。
//用法：
<ion-side-menus>
	// Center content
	<ion-side-menu-content ng-controller="ContentController">
	</ion-side-menu-content>
	// Left menu
	<ion-side-menu side="left">
	</ion-side-menu>
	//Right menu
	<ion-side-menu side="right">
	</ion-side-menu>
</ion-side-menus>
function ContentController($scope,$ionicSideMenuDelegate){
	$scope.toggleLeft = function(){
		$ionicSideMenuDelegate.toggleLeft();
	}
}


1.5 . ion-side-menu-content
// 展示主要内容的容器。可以通过滑动屏幕来展开menu
// 用法
<ion-side-menu-content
	edge-drap-threshold="true"
	drag-content="true">
</ion-side-menu-content>


1.5   ion-side-menu
// 存放侧边栏的容器，
// 用法
<ion-side-menu
	side="left"
	width="myWidthValue + 20"
	is-enabled="shouldLeftSideMenuBeEnabled()">
</ion-side-menu>


1.6   menu-toggle
// 用于切换显示侧边栏菜单
// 用法
<ion-view>
	<ion-nav-buttons side="left">
		<button menu-toggle="left" class="button button-icon icon ion-navicon"></button>
	</ion-nav-buttons>
	...
</ion-view>


1.7   . menu-close
// 关闭当前打开的menu，下面的例子是在一个menu栏里面的一项菜单，点击可以关闭menu
<a menu-close href="#/home" class="item">Home</a>

1.8  . $ionicSideMenuDelegate
// 用于指定控制 ionSideMenus 的实例，
// 用法
<body ng-controller="MainCtrl">
	<ion-side-menus>
		<ion-side-menu-content>
			Content!
			<button ng-click="toggleLeftSideMenu()">
				Toggle left Side Menu
			</button>
		</ion-side-menu-content>
		<ion-side-menu side="left">
			Left Menu!
		</ion-side-menu>
	</ion-side-menus>
</body>
function MainCtrl($scope,$ionicSideMenuDelegate){
	$scope.toggleLeftSideMenu = function(){
		$ionicSideMenuDelegate.toggleLeft();
	};
}

// 方法
// toggleLeft([isOpen]), Toggle the left side menu (if it exists).


2.0   Navigation 
ion-nav-view

// ionic能够记录用户的导航历史，能够在导航页面间添加过渡效果。ionic使用的是AngularUI router模块以‘states’来组织app 的界面。
// 在Angular核心中的\$route service，可以通过url来控制不同的view。而AngularUI router提供了一个更强大的state manager，
// 可以和named, nested, and parallel views绑定，允许不止一个模板来渲染页面。另外，不同的state不需要和url绑定，数据会
// 自动更新。

// ionNavView 是用来渲染视图中的模板的，每个模板是其中的一个状态。不同的state通常在程序中定义映射到一个url。
// 用法
// 在这个例子中，我们创建一个导航，切换不同的状态。我们使用ionNavView显示content，使用ionNavBar显示顶栏，可以在animation样式
// 中指定切换的动画效果，推荐的有: ‘slide-left-right’, ‘slide-left-right-ios7’, ‘slide-in-up’.
<ion-nav-bar></ion-nav-bar>
<ion-nav-view animation="slide-left-right">
	Center content
</ion-nav-view>

//

var app = angular.module('myApp',['ionic']);
app.config(function($stateProvider){
	$stateProvider
	.state('index',{
		url:'/',
		templateUrl:'home.html'
	})
	.state('music',{
		url:'/music',
		templateUrl:'music.html'
	});
});
// 在app启动的时候，\$stateProvider 会查看url, 如果和 index 状态匹配,然后会在 中加载 home.html.
// 在Angular中创建模板的一种简单的方法是把html内容放在
<script type="text/ng-template"></script>
// 里面，如下：
2.1.ion-view
// 作为ionNavView的子元素，用于展示当前的view。
// 用法
<ion-nav-bar></ion-nav-bar>
<ion-nav-view class="slide-left-right">
	<ion-view title="My Page">
		<ion-content>Hello!</ion-content>
	</ion-view>
</ion-nav-view>

// API
// title(optional)	string	The title to display on the parent ionNavBar.

// hide-back-button(optional)  boolean  Whether to hide the back button on the parent ionNavBar by default.

// hide-nav-bar(optional)  boolean	 Whether to hide the parent ionNavBar by default.

2.2  ion-nav-bar

// 如果我们使用ionNavView指令，我们就可以创建一个顶部栏，这个顶部栏会随着应用的状态变化而变化。

// 我们可以在里面放置一个返回的按钮ionNavBackButton 用于返回操作。

// 也可以在ionNavButtons 中添加业务需要的按钮。
// 通过animation 属性可以添加标题切换的动态效果。推荐的效果是’nav-title-slide-ios7’。

// ion-nav-bar 只有在你的元素内部中有ionView 标签包裹的情况下才会正常工作。

// 用法
<body ng-app="starter"> 
//The nav bar that will be updated as we navigate
	<ion-nav-bar class="bar-position" animation="nav-title-slide-ios7">
	</ion-nav-bar>
//where the initial view template will be rendered
	<ion-nav-view>
		<ion-view>
			<ion-content>Hello!</ion-content>
		</ion-view>
	</ion-nav-view>

</body>


// API接口
// 属性：delegate-handle(optional) 	类型：string	
// 描述：The handle used to identify this navBar with $ionicNavBarDelegate.

// 属性：align-title(optional) 	类型：string	
// 描述：Where to align the title of the navbar. Available: 'left', 'right', 'center'. Defaults to 'center'.

// 属性：no-tap-scroll(optional)	类型：boolean	
// 描述：By default, the navbar will scroll the content to the top when tapped. Set no-tap-scroll to true to disable this behavior.

// 其他用法
// 你可以把ion-nav-bar放到不同的ion-view 元素里面，这样你的每个不同的ion-view就有各自独立的navbar。
// 这个和在ion-view里面放置 header bar 差不多，只是这里拥有navbar的特性。需要注意，这样使用时，在navbar 里面放置buttons就可以，不要使用。


















































