AngularJS 性能问题及调优.html


七大调优法则 

<!-- 1.  渲染没有数据绑定的列表  -->

这是最明显的解决方案，因为数据绑定是性能问题最可能的根源。如果你只想显示一次列表，并不需要更新、改变数据，放弃数据绑定是绝佳的办法。不过可惜的是，你会失去对数据的控制权，但除了该法，我们别无选择。


<!-- 2.不要使用内联方法计算数据  -->

为了在控制器中直接过滤列表，不要使用可获得过滤链接的方法。“ng-repeat”会评估每个表达式。在我们的案例中，“filteredItems()”返回过滤链接。如果评估过程很慢，它将迅速降低整个应用的速度。
 
l <li ng-repeat="item in filteredItems()"> //这并不是一个好方法，因为要频繁地评估。   
l <li ng-repeat="item in items"> //这是要采用的方法 


<!-- 3.使用两个列表（一个用来进行视图显示，一个作为数据源）  -->

将要显示的列表与总的数据列表分开，是非常有用的模型。你可以对一些过滤进行预处理，并将存于缓存中的链接应用到视图上。下面案例展示了基本实现过程。filteredLists变量保存着缓存中的链接，applyFilter方法来处理映射。

/* Controller */  

// Basic list    
var items = [{name:"John", active:true }, {name:"Adam"}, {name:"Chris"}, {name:"Heather"}];    
// Init displayedList   
$scope.displayedItems = items;  
// Filter Cache   
var filteredLists['active'] = $filter('filter)(items, {"active" : true});  
	// Apply the filter   
$scope.applyFilter = function(type) {  
    if (filteredLists.hasOwnProperty(type){ // Check if filter is cached   
       $scope.displayedItems = filteredLists[type];  
    } else {   
        /* Non cached filtering */  
    }  
}  

// Reset filter   
$scope.resetFilter = function() {  
    $scope.displayedItems = items;  
}  



/* View */  
<button ng-click="applyFilter('active')">Select active</button>  
<ul><li ng-repeat="item in displayedItems">{{item.name}}<li></ul>  


<!-- 4.在其他模板中使用ng-if来代替ng-show  -->

如果你用指令、模板来渲染额外的信息，例如通过点击来显示列表项的详细信息，一定要使用  ng-if（AngularJSv. 1.1.5以后）。ng-if可阻止渲染（与ng-show相比）。所以其它DOM和数据绑定可根据需要进行评估。

<li ng-repeat="item in items">  
 
   <p> {{ item.title }} </p>  
   <button ng-click="item.showDetails = !item.showDetails">Show details</buttons>  
   <div ng-if="item.showDetails">  
       {{item.details}}  
   </div>  
</li>  




<!-- 5.不要使用ng-mouseenter、ng-mouseleave等指令  -->

使用内部指令，像ng-mouseenter，AngularJS会使你的页面闪烁。浏览器的帧速率通常低于每秒30帧。使用jQuery创建动画、鼠标悬浮效果可以解决该问题。确保将鼠标事件放入jQuery的.live()函数中。




<!-- 6.关于过滤的小提示：通过ng-show隐藏多余的元素  -->

对于长列表，使用过滤同样会减低工作效率，因为每个过滤都会创建一个原始列表的子链接。在很多情况下，数据没有变化，过滤结果也会保持不变。所以对数据列表进行预过滤，并根据情况将它应用到视图中，会大大节约处理时间。
在ng-repeat指令中使用过滤器，每个过滤器会返回一个原始链接的子集。AngularJS 从DOM中移除多余元素（通过调用 $destroy），同时也会从$scope中移除他们。当过滤器的输入发生改变时，子集也会随着变化，元素必须进行重新链接，或着再调用$destroy。
大部分情况下，这样做很好，但一旦用户经常过滤，或者列表非常巨大，不断的链接与
销毁将影响性能。为了加快过滤的速度，你可以使用ng-show和ng-hide指令。在控制器中，进行过滤，并为每项添加一个属性。依靠该属性来触发ng-show。结果是，只为这些元素增加ng-hide类，来代替将它们移除子列表、$scope和DOM。
触发ng-show的方法之一是使用表达式语法。ng-show的值由表达式语法来确定。可以看下面的例子：

<input ng-model="query"></input>  
<li ng-repeat="item in items" ng-show="([item.name] | filter:query).length"> {{item.name}} </li>
<span style="font-size: 14px; line-height: 24px; font-family:; white-space: normal;"></span> 




<!-- 7.关于过滤的小提示：防抖动输入 -->

解决第6点提出的持续过滤问题的另一个方法是防抖动用户输入。例如，如果用户输入一个搜索关键词，只当用户停止输入后，过滤器才会被激活。使用该防抖动服务的一个很好的解决方案请见： http://jsfiddle.net/Warspawn/6K7Kd/。将它应用到你的视图及控制器中，如下所示：
/* Controller */  
// Watch the queryInput and debounce the filtering by 350 ms.   
$scope.$watch('queryInput', function(newValue, oldValue) {  
    if (newValue === oldValue) { return; }  
    $debounce(applyQuery, 350);  
});  
var applyQuery = function() {   
    $scope.filter.query = $scope.query;  
};    
/* View */  
<input ng-model="queryInput"/>  
<li ng-repeat= item in items | filter:filter.query>{{ item.title }} </li> 
