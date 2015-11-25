// Ionic JS文档.html -->

1.0   ion-header-bar




<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
</head>
<body>
	<!-- ion-header-bar -->
<ion-header-bar align-title="left" class="bar-positive">
  <div class="buttons">
    <button class="button" ng-click="doSomething()">左侧按钮</button>
  </div>
  <h1 class="title">Title!</h1>
  <div class="buttons">
    <button class="button">右侧按钮</button>
  </div>
</ion-header-bar>
<ion-content>
  一些内容!
</ion-content>

// ion-footer-bar -->

<ion-content>
  一些内容!
</ion-content>
<ion-footer-bar align-title="left" class="bar-assertive">
  <div class="buttons">
    <button class="button">左侧按钮</button>
  </div>
  <h1 class="title">Title!</h1>
  <div class="buttons" ng-click="doSomething()">
    <button class="button">右侧按钮</button>
  </div>
</ion-footer-bar>




2.0       ion-scroll
<ion-scroll
  [delegate-handle=""]
  [direction=""]
  [paging=""]
  [on-refresh=""]
  [on-scroll=""]
  [scrollbar-x=""]
  [scrollbar-y=""]
  [zooming=""]
  [min-zoom=""]
  [max-zoom=""]>
  ...
</ion-scroll>


2.1   ion-infinite-scroll 
// 当用户到达页脚或页脚附近时，ionInfiniteScroll指令允许你调用一个函数 。

// 当用户滚动的距离超出底部的内容时，就会触发你指定的on-infinite。

// 用法
<ion-content ng-controller="MyController">
  <ion-infinite-scroll
    on-infinite="loadMore()"
    distance="1%">
  </ion-infinite-scroll>
</ion-content>
//
function MyController($scope,$http){
  $scope.items = [];
  $scope.loadMore = function(){
    $http.get('/more-items').success(function(items){
      useItems(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');

    });
  };
  $scope.$on('stateChangeSuccess',function(){
    $scope.loadMore();
  });
}
// 当没有更多数据加载时，就可以用一个简单的方法阻止无限滚动，那就是angular的ng-if 指令:
<ion-infinite-scroll
  ng-if="moreDataCanBeLoaded()"
  icon="ion-loading-c"
  on-infinite="loadMoreData()">
</ion-infinite-scroll>

2.2   $ionicScrollDelegate

// 授权控制滚动视图（通过ionContent 和 ionScroll指令创建）。

// 该方法直接被$ionicScrollDelegate服务触发，来控制所有滚动视图。用 $getByHandle方法控制特定的滚动视图。

// 用法
<body ng-controller="MainCtrl">
  <ion-content>
    <button ng-click="scrollTop()">滚动到顶部!</button>
  </ion-content>
</body>

function MainCtrl($scope, $ionicScrollDelegate) {
  $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };
}

// 高级用法的例子，用带有两个滚动区域的delegate-handle来特殊控制。

<body ng-controller="MainCtrl">
  <ion-content delegate-handle="mainScroll">
    <button ng-click="scrollMainToTop()">
      滚动内容到顶部!
    </button>
    <ion-scroll delegate-handle="small" style="height: 100px;">
      <button ng-click="scrollSmallToTop()">
        滚动小区域到顶部!
      </button>
    </ion-scroll>
  </ion-content>
</body>

function MainCtrl($scope, $ionicScrollDelegate) {
  $scope.scrollMainToTop = function() {
    $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
  };
  $scope.scrollSmallToTop = function() {
    $ionicScrollDelegate.$getByHandle('small').scrollTop();
  };
}



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
// title(optional)  string  The title to display on the parent ionNavBar.

// hide-back-button(optional)  boolean  Whether to hide the back button on the parent ionNavBar by default.

// hide-nav-bar(optional)  boolean   Whether to hide the parent ionNavBar by default.

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
// 属性：delegate-handle(optional)   类型：string 
// 描述：The handle used to identify this navBar with $ionicNavBarDelegate.

// 属性：align-title(optional)   类型：string 
// 描述：Where to align the title of the navbar. Available: 'left', 'right', 'center'. Defaults to 'center'.

// 属性：no-tap-scroll(optional) 类型：boolean  
// 描述：By default, the navbar will scroll the content to the top when tapped. Set no-tap-scroll to true to disable this behavior.

// 其他用法
// 你可以把ion-nav-bar放到不同的ion-view 元素里面，这样你的每个不同的ion-view就有各自独立的navbar。
// 这个和在ion-view里面放置 header bar 差不多，只是这里拥有navbar的特性。需要注意，这样使用时，在navbar 里面放置buttons就可以，不要使用。


2.3   ion-nav-buttons 
// 隶属于ionNavView

// 在ionView内的ionNavBar上用ionNavButtons设置按钮。

// 你设置的任何按钮都将被放置在导航栏的相应位置，当用户离开父视图时会被销毁。

// 用法
<ion-nav-bar>
</ion-nav-bar>
<ion-nav-view>
  <ion-view>
    <ion-nav-buttons side="left">
      <button class="button" ng-click="doSomething()">
        我是一个在导航栏左侧的按钮！
      </button>
    </ion-nav-buttons>
    <ion-content>
      这里是一些内容！
    </ion-content>
  </ion-view>
</ion-nav-view>



3.0   action sheet

// $ionicActionSheet 是一个上拉显示的菜单控件，危险的操作可以用不同的颜色标示，点击屏幕的背景处或者按escape键即可取消显示。如下图：

// 用法
// 在你的controller中使用$ionicActionSheet来触发 Action Sheet
angular.module('mySuperApp',['ionic'])
.controller(function($scope,$ionicActionSheet,$timeout){
  //Triggered on a button click,or some other target
  $scope.show = function(){
    //Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      buttons:[
        { text:'<b>Share</b> This' },
        { text:'Move' }
      ],
      destructiveText:'Delete',
      titleText:'Modify your album',
      cancelText:'Cancel',
      cancel:function(){
        //add cancel code...
      },
      buttonclicked:function(index){
        return true;
      }
    });

    //For example's sake,hide the sheet after two seconds
    $timeout(function(){
      hideSheet();

    },2000);
  };
});



4.0  Backdrop

// $ionicBackdrop 在UI上显示或隐藏背景层，在弹出框、加载框、其他弹出层中使用。许多UI界面需要背景层，在一个DOM页面只需要一个
// 背景层就够了。在组件中可以使用$ionicBackdrop.retain()来显示背景层，使用$ionicBackdrop.release()隐藏背景层。
// 每次调用retain后，背景会一直显示，直到调用release消除背景层。
// 用法：

function MyController($scope,$ionicBackdrop,$timeout){
  //Show a backdrop for one second
  $scope.action = function(){
    $ionicBackdrop.retain();
    $timeout(function(){
      $ionicBackdrop.release();
    },1000);
  }
}

// 方法：
// retain()    保持显示背景层
// release()    释放背景层


5.0     事件Events

// 本节详细介绍ionic支持的所有事件。

// on-hold
// 同一位置触摸时间超过500ms，类似于angular和jquery中的long touch。
// 用法：
<button on-hold="onHold()" class="button">Test</button>

// on-tap
// 快速触摸某个位置，触摸时间不超过250ms。
// 用法：
<button on-tap="onTap()" class="button">Test</button>

// on-touch
// 用户开始触摸屏幕就立即触发该事件。
// 用法:
<button on-touch="onTouch()" class="button">Test</button>

// on-release
// 用户离开屏幕，结束触摸时触发
// 用法：
<button on-release="onRelease()" class="button">Test</button>

// on-drag
// 在页面触摸一个点移动时触发。向左或向右拖拽时阻止页面滚动是一个很好饿用户体验。
// 用法：
<button on-drag="onDrag()" class="button">Test</button>

// on-drag-up
// 向上拖拽时候触发。
// 用法：
<button on-drag-up="onDragUp()" class="button">Test</button>

// on-drag-right
// 向右拖拽时候触发。
// 用法：
<button on-drag-right="onDragRight()" class="button">Test</button>

// on-drag-down
// 向下拖拽时候触发。
// 用法：
<button on-drag-down="onDragDown()" class="button">Test</button>

// on-drag-left
// 向左拖拽时候触发。
// 用法：
<button on-drag-left="onDragLeft()" class="button">Test</button>

// on-swipe
// 很快的速度向任何方向滑动时触发
// 用法：
<button on-swipe="onSwipe()" class="button">Test</button>

// on-swipe-up
// 快速向上滑动时触发
// 用法：
<button on-swipe-up="onSwipeUp()" class="button">Test</button>

// on-swipe-left
// 快速向左滑动时触发
// 用法：
<button on-swipe-left="onSwipeLeft()" class="button">Test</button>

// on-swipe-right
// 快速向右滑动时触发
// 用法：
<button on-swipe-right="onSwipeRight()" class="button">Test</button>

// on-swipe-down
// 快速向上滑动时触发
// 用法：
<button on-swipe-down="onSwipeDown()" class="button">Test</button>




6.0    FormInputs
6.1  ion-checkbox
// 这个checkbox指令和网页版的没什么区别，只是显示的样式不一样。其行为和AngularJs checkbox是一样的。
//用法：
<ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox>

6.2  ion-radio

// 这个radio指令和网页版的没什么区别，只是显示的样式不一样。其行为和AngularJs Radio是一样的。
// 用法：
<ion-radio ng-model="choice" ng-value="'A'">Choose A</ion-radio>
<ion-radio ng-model="choice" ng-value="'B'">Choose B</ion-radio>
<ion-radio ng-model="choice" ng-value="'C'">Choose C</ion-radio>

6.3   ion-toggle

// ion-toggle是个模拟的开关，绑定一个boolean类型的数据模型。可以通过拖拽切换开关。其行为和AngularJs checkbox是一样的。
<ion-toggle ng-model="airplaneMode" toggle-class="toggle-calm">Airplane Mode</ion-toggle>


7.0   loading

// $ionicLoading , 当用户不能交互时的弹出层，用于表示应用正在运行。
// 用法：
angular.module('LoadingApp',['ionic'])
.controller('LoadingCtrl',function($scope,$ionicLoading){
  $scope.show = function(){
    $ionicLoading.show({
      template:'Loading...'
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide();
  };
});

API方法：
// show(options), 显示loading加载层。如果loading已经显示了，则会应用options的值，并保持显示。

// options，类型：object，可用的值如下：
// --{string=}，template 显示的html内容
// --{string=}，加载的html的url
// --{boolean=}，noBackDrop，是否显示后台页面，默认是显示
// --{number=},delay,延时多长时间再显示这个loading,默认无延迟
// --{number=}，duration，显示多长时间后隐藏loading层，默认一直显示，直到调用hide方法

// hide方法：hide(),隐藏显示的loading层


8.0   Modal

// $ionicModal,参看下面的ionicModal controller.
// modal就是一个暂时浮现在view视图最上方的内容面板，经常用作选择或者编辑某个项目，把内容放在元素中即可。
// 注意：model会从它自身的scope中广播’modal.shown’, ‘modal.hidden’, 和’modal.removed’事件，把这个作为传递事件参数
// 的一部分。移除model时会调用modal.removed 和 modal.hidden 这两个事件。

// 下面的例子假设你的modal在index首页或某个模板中，如果不是的话，你可以去掉script标签，通过文件名调用
<script id="my-modal.html" type="text/ng-template">
  <ion-modal-view>
    <ion-header-bar>
      <h1 class="title">My Modal title</h1>
    </ion-header-bar>

    <ion-content>Hello!</ion-content>

  </ion-modal-view>
</script>
//
angular.module('testApp',['ionic'])
.controller('MyController',function($scope,$ionicModal){
  $ionicModal.fromTemplateUrl('my-modal.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.openModal = function(){
    $scope.modal.show();
  };

  $scope.closeModal = function(){
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destory',function(){
    $scope.modal.remove();
  });
  //Execute action on hide modal
  $scope.$on('modal.hidden',function(){
    //Execute action
  });
  $scope.$on('modal.remove',function(){
    //Execute action
  });
});


// API方法参数：

// fromTemplate(templateString, options)，返回 ionicModal的控制器实例
// ----templateString, 类型string，modal中显示的内容。
// ----options，类型object，传递给 ionicModal#initialize  初始化方法的参数
// -------------------------------------------
// fromTemplateUrl(templateUrl, options)，返回 ionicModal的控制器实例中用到的promise对象
// ----templateString, 类型string，modal中显示的内容url。
// ----options，类型object，传递给 ionicModal#initialize  初始化方法的参数

8.1  ionicModal

// 由$ionicModal 服务调用，当你不需要modal的时候，要及时调用remove()方法以避免发生内存泄漏。
// 注意：model会从它自身的scope中广播’modal.shown’, ‘modal.hidden’, 和’modal.removed’事件，把这个作为传递事件参数的一部分。移除model时会调用modal.removed 和 modal.hidden 这两个事件。

// // 方法：

// initialize(options), 创建一个新的modal控制器实例
// ----options，类型object，可选值：
// -------------{object=} 父scope，默认在$rootScope下创建独立的scope
// -------------{string=} 显示或隐藏的动画效果. 默认是'slide-in-up'
// -------------{boolean=} 是否让modal的第一个输入获得焦点，默认是false.
// -------------{boolean=} 点击背景的是否自动关闭modal，默认是 true
// -------------{boolean=} 是否可以使用手机的硬件返回按钮关闭modal，默认: true.
// show()，显示modal，返回modal显示后的promise对象
// hide(), 隐藏modal，返回modal隐藏后的promise对象
// remove()，从dom中移除modal实例，并clean，返回modal移除后的promise对象
// isShown(), 返回boolean，表示当前modal是否显示




9.0   Popover

// $ionicPopover, 参看接着讲解的 ionicPopover 控制器。这个控件和上篇中讲到的ionicModal 内容基本一致。
// popover是浮动在用户app内容之上的view视图，很方便的用来展示或收集用户信息，主要用于：

// 展示当前view视图的更多信息
// 选择一个常用的工具或配置
// 展现一个app视图中的动作列表
// 把要显示在popover中的内容放在元素中即可。
// 用法：
<p>
  <button ng-click="openPopover($even)">Open Popover</button>
</p>

<script id="my-popover.html" type="text/ng-template">
  <ion-popover-view>
    <ion-header-bar>
      <h1 className="title">My Popover Title</h1>
    </ion-header-bar>
    <ion-content>
      Hello!
    </ion-content>
  </ion-popover-view>
</script>

//
angular.module('testApp',['ionic'])
.controller('MyController',function($scope,$ionicPopover){
  $ionicPopover.fromTemplateUrl('my-popover.html',{
    scope:$scope,
  }).then(function(popover){
    $scope.popover.show($event);
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function(){
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destory',function(){
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})



// API 方法：

// fromTemplate(templateString, options), 返回ionicPopover的控制器实例
// ----templateString, 类型string，modal中显示的内容。
// ----options，类型object，传递给 $ionicPopover 初始化方法的参数
// -------------------------------------------
// fromTemplateUrl(templateUrl, options)，返回 ionicPopover 的控制器实例中用到的promise对象
// ----templateString, 类型string，modal中显示的内容url。
// ----options，类型object，传递给 $ionicPopover 初始化方法的参数
// ionicPopover

// 由$ionicPopover 服务调用，当你不需要popover 的时候，要及时调用remove()方法以避免发生内存泄漏。
// 注意：popover 会从它自身的scope中广播’popover.shown’, ‘popover.hidden’, 和’popover.removed’事件，把这个作为传递事件参数的一部分。移除popover时会调用popover.removed 和 popover.hidden 这两个事件。

// 方法：

// initialize(options), 创建一个新的modal控制器实例
// ----options，类型object，可选值：
// -------------{object=} 父scope，默认在$rootScope下创建独立的scope
// -------------{string=} 显示或隐藏的动画效果. 默认是'slide-in-up'
// -------------{boolean=} 是否让popover的第一个输入获得焦点，默认是false.
// -------------{boolean=} 点击背景的是否自动关闭popover，默认是 true
// -------------{boolean=} 是否可以使用手机的硬件返回按钮关闭popover，默认: true.
// show($event)，显示popover，返回popover 显示后的promise对象
// ------$event，这个popover对齐的event或target元素
// hide(), 隐藏popover，返回popover 隐藏后的promise对象
// remove()，从dom中移除popover 实例，并clean，返回popover 移除后的promise对象
// isShown(), 返回boolean，表示当前popover 是否显示


10.0   platform

// $ionicPlatform , 参看本篇utility中介绍的 ionic.Platform.
// 用于检测当前的系统平台。比如处理绑定某些android手机上有硬件返回按钮的事件。
// API 方法：

// onHardwareBackButton(callback), 当点击系统物理按键时绑定的方法
// ----callback，类型function，绑定的回调方法
// offHardwareBackButton(callback)，移除绑定在点击物理按键的回调方法
// ----callback，类型function，已经绑定的方法
// registerBackButtonAction(callback, priority, [actionId])，给物理按键绑定一个action动作，当点击物理按键时，实际上只会执行一个action，所以这里会指定优先级参数。例如当显示actionsheet的时候，点击物理返回按键，这时候应该关闭这个actionsheet，而不应该退出程序，或者关闭其他的modal。返回是一个function函数，当调用这个返回函数时，会解除绑定的回调。
// ----callback，类型function，绑定的回调方法
// ----priority，类型number，优先级，只会执行优先级最高的方法
// ----actionId（可选），绑定这个回调对应的id，默认是随机生成的唯一的id
// on(type, callback)，增加Cordova 事件监听器，比如pause, resume, volumedownbutton, batterylow, offline, 等等。更多信息，参考[Cordova's event documentation](https://cordova.apache.org/docs/en/edge/cordova_events_events.md.html#Events ). 返回function函数，调用这个返回函数可以移除注册的监听器。
// ----type, 类型string，Cordova 事件类型
// ----callback，类型function，监听函数
// ready([callback])，当设备ready时候触发的事件。当设备已经ready时，会立马触发这个函数。返回一个promise对象，设备ready时候用到。
// ----callback，类型function，监听函数


11.0  Popup

// ionic popup服务允许通过程序创建一个popup弹出的窗口，需要用户交互才可以继续。
// popup支持原生的 alert(),prompt(),confirm() 这些弹出窗口，也支持可定制内容和样式的弹出框。
// popup中的input可以增加autofocus属性，这样当弹出对话框时，会自动是这个input获得焦点。

// 用法：

angular.module('mySuperApp', ['ionic'])
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
// Triggered on a button click, or some other target
$scope.showPopup = function() {
  $scope.data = {}
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="password" ng-model="data.wifi">',
    title: 'Enter Wi-Fi Password',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      },
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 3000);
 };
 // A confirm dialog
 $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Consume Ice Cream',
     template: 'Are you sure you want to eat this ice cream?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };
 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
});

// API 方法：

// show(options), 显示一个复杂的popup弹出框。
// 复杂的弹出框，可以设置一个buttons数组，里面每个button可以设置text属性，type属性和onTap事件，而系统默认在点击按钮时，会关闭对话框并返回结果到promise对象中，如果你不想关闭对话框，可以在onTap事件函数中调用event.preventDefault()。返回一个promise对象，该对象有个close方法，可以在程序中调用这个方法来关闭弹出框。
// —-options， 类型是object，参考示例如下：
{
  title: '', // String. The title of the popup.
  subTitle: '', // String (optional). The sub-title of the popup.
  template: '', // String (optional). The html template to place in the popup body.
  templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
  scope: null, // Scope (optional). A scope to link to the popup content.
  buttons: [{ //Array[Object] (optional). Buttons to place in the popup footer.
    text: 'Cancel',
    type: 'button-default',
    onTap: function(e) {
      // e.preventDefault() will stop the popup from closing when tapped.
      e.preventDefault();
    }
  }, {
    text: 'OK',
    type: 'button-positive',
    onTap: function(e) {
      // Returning a value will cause the promise to resolve with the given value.
      return scope.data.response;
    }
  }]
}


// alert(options)，警告弹出框，显示一段信息，和一个按钮，点击按钮可以关闭弹出框。返回一个promise对象，该对象有个close方法，可以在程序中调用这个方法来关闭弹出框。
// ——options，类型object，配置弹出框的参数。
{
  title: '', // String. The title of the popup.
  subTitle: '', // String (optional). The sub-title of the popup.
  template: '', // String (optional). The html template to place in the popup body.
  templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
  okText: '', // String (default: 'OK'). The text of the OK button.
  okType: '', // String (default: 'button-positive'). The type of the OK button.
}



// confirm(options)，弹出一个comfirm对话框，点击ok按钮返回true，点击cancel返回false的promise对象。返回一个promise对象，该对象有个close方法，可以在程序中调用这个方法来关闭弹出框。
// ——options，类型object，显示confirm对话框的参数。例子：
{
  title: '', // String. The title of the popup.
  subTitle: '', // String (optional). The sub-title of the popup.
  template: '', // String (optional). The html template to place in the popup body.
  templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
  cancelText: '', // String (default: 'Cancel'). The text of the Cancel button.
  cancelType: '', // String (default: 'button-default'). The type of the Cancel button.
  okText: '', // String (default: 'OK'). The text of the OK button.
  okType: '', // String (default: 'button-positive'). The type of the OK button.
}



// prompt(options),显示一个带有输入框，ok按钮，cancel按钮的对话框。点击ok时，返回的promise对象中包含输入的值，点击cancel时，值为undefined。返回的promise对象有个close方法，可以在程序中调用这个方法来关闭弹出框。使用例子：
// 
$ionicPopup.prompt({
   title: 'Password Check',
   template: 'Enter your secret password',
   inputType: 'password',
   inputPlaceholder: 'Your password'
 }).then(function(res) {
   console.log('Your password is', res);
 });
// —— options, 类型object，配置对话框参数。示例：
{
  title: '', // String. The title of the popup.
  subTitle: '', // String (optional). The sub-title of the popup.
  template: '', // String (optional). The html template to place in the popup body.
  templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
  inputType: // String (default: 'text'). The type of input to use
  inputPlaceholder: // String (default: ''). A placeholder to use for the input.
  cancelText: // String (default: 'Cancel'. The text of the Cancel button.
  cancelType: // String (default: 'button-default'). The type of the Cancel button.
  okText: // String (default: 'OK'). The text of the OK button.
  okType: // String (default: 'button-positive'). The type of the OK button.
}




11.0    scroll

// ion-scroll 创建一个可以容纳所有内容，滚动的容器。
// 用法：
<ion-scroll zooming="true" direction="xy" style="width: 500px; height: 500px">
  <div style="width: 5000px; height: 5000px; background: url('https://upload.wikimedia.org/wikipedia/commons/a/ad/Europe_geological_map-en.jpg') repeat"></div>
 </ion-scroll>
// 注意：设置scroll box的高度和内部内容的高度很重要，这样才可以让滚动区域随意滚动显示。
// API 参数：
// delegate-handle(optional), string,控制这个scroll view的委托实例$ionicScrollDelegate
// direction(optional),string,滚动的方向. 'x' or 'y' or 'xy'. 默认是 'y'.
// 属性：locking（可选）,类型boolean，是否锁定一次只能滚动一个方向
// 属性:padding（可选），类型boolean，是否给content增加padding，iOS默认为true，android默认为false
// 属性：scroll（可选），类型boolean，是否允许滚动内容，默认是true
// 属性：on-scroll，类型：expression，滚动内容时执行的表达式
// 属性：on-refresh，类型：expression，下拉刷新时调用，由ionRefresher 触发。
// 属性：scrollbar-x，类型boolean，是否显示x轴滚动条
// 属性：scrollbar-y，类型boolean，是否显示y轴滚动条
// 属性：zooming，类型boolean，是否支持手势缩放
// 属性：min-zoom，类型integer，最小缩放比例，默认是0.5
// 属性：max-zoom，类型integer，最大缩放比例，默认是3
// 属性：has-bouncing，类型：boolean，是否允许滚动时弹跳超过内容体的边界，ios默认true，Android默认false


11.1   ion-infinite-scroll

// ionContent 和 ionScroll 中共有的子元素。
// ionInfiniteScroll 允许你在用户滚动到内部内容的边缘时调用一个回调函数。
// 当用户滚动内容距离底部小于distance定义的距离时，会自动调用on-infinite中定义的回调函数，可以加载更多内容，加载完更多内容后，在控制器中需要广播croll.infiniteScrollComplete 事件。使用实例：
<ion-content ng-controller="MyController">
  <ion-list>
  ....
  ....
  </ion-list>
  <ion-infinite-scroll
    on-infinite="loadMore()"
    distance="1%">
  </ion-infinite-scroll>
</ion-content>
function MyController($scope, $http) {
  $scope.items = [];
  $scope.loadMore = function() {
    $http.get('/more-items').success(function(items) {
      useItems(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });
}
// 当没有更多内容加载时，停止infinite scroll的方法是使用ng-if指令
<ion-infinite-scroll
  ng-if="moreDataCanBeLoaded()"
  icon="ion-loading-c"
  on-infinite="loadMoreData()">
</ion-infinite-scroll>

// API 参数：
// on-infinite, 类型expression，当滚动到底部时候的调用函数
// distance（可选），类型string，定义距离底部多少时调用on-infinite定义的表达式，默认是：1%
// icon（可选），类型string，定义加载过程中显示的图标，默认是‘ion-loading-d'



















































</body>
</html>