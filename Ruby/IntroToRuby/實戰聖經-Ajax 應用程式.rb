






1.0  Unobtrusive JavaScript

Unobtrusive也就是將JavaScript程式與HTML完全分開，除了可以讓HTML碼乾淨之外，也可以支援更換不同的JavaScript Library，例如把Rails內建的jQuery換成Protytype.js或angular.js等等。

1.1  Ajax 表單

除了超連結 link_to 加上 :remote 可以變成 Ajax 之外，表單 form_for 也可以加上:remote變成 Ajax。

form_for @user, :remote => true

1.2  Ajax 按鈕

同理於超連結 link_to，按鈕 button_to 加上:remote => true參數也會變成 Ajax。

除了已經看過的 :data => { :confirm => "Are you Sure?" }之外，disable_with可以避免使用者連續按下送出：

button_to "Remove", user_path(@user), :data => { :disable_with => 'Removing' }




2.0  第一種方式：替換 HTML 片段

編輯 app/views/events/index.html.erb 最下方加入：

<%= link_to 'Hello!', welcome_say_hello_path, :id => "ajax-load"  %>	<div id="content">
</div>

<script>
    $(document).ready(function() {
        $('#ajax-load').click( function(){
            $('#content').load( $(this).attr("href") );
            return false;
        });

    });
</script>

如此點下超連結後，就會把回傳的HTML置入到<div id="content">裡面。



3.0  第二種方式：使用 JavaScript 腳本

# 編輯 app/views/events/index.html.erb，在迴圈中間加入
<%= link_to 'ajax show', event_path(event), :remote => true %> >

# 在迴圈外插入一個<div id="event_area"></div>
# 編輯 app/controllers/events_controller.rb，在 show action 中加入

respond_to do |format|
	format.html
	format.js
end

# 新增 app/views/events/_event.html.erb，內容與 show.html.erb 相同
# 新增 app/views/events/show.js.erb，內容如下

$('#event_area').html("<%= escape_javascript(render :partial => 'event') %>")
				.css({ backgroundColor: '#ffff99' });

# 瀏覽 http://localhost:3000/events
# escape_javascript()可以縮寫為j()。



4.0   第三種方式：使用 JSON 資料格式

JavaScript Object Notation(JSON)是一種源自JavaScript的資料格式，是目前Web應用程式之間的準標準資料交換格式，在Rails之中，每個物件都有to_json方法可以很方便的轉換資料格式。

<%= link_to 'ajax show', event_path(event), :remote => true, :data => { type => :json }, :class => "ajax_update" %> >

點擊ajax show就會送出Ajax request了，但接下來要怎麼撰寫處理JSON的程式呢？

<script>
$(document).ready(function(){
	$('.ajax_update').on("ajax:success", function(event, data){
		var event_area = $('#event_area');
		event_area.html( data.name );
	});
});
</script>

當然，你也可以把HTML片段當做JSON的資料來傳遞。

另一種JSON的變形是JSONP(JSON with Padding)，將JSON資料包在一個JavaScript function裡，這個做的用處是讓這個API可以跨網域被呼叫。要回傳JSONP格式，只需要在render :json時多一個參數是:callback即可

respond_to do |format|
	format.json { render :json => @user.to_json, :callback => "process_user" }
end




5.0   Turbolinks

事實上，Rails預設讓每個換頁都用上了Ajax技巧，這一招叫做Turbolinks，在預設的Gemfile中可以看到gem "turbolinks"，以及Layout中的data-turbolinks-track。

它的作用是讓每一個超連結都只用Ajax的方式將整個body內容替換掉，這樣換頁時就不需要重新載入head部份的標籤，包括JavaScript和CSS等等，目的是可以改善換頁時的速度。

要特別注意因為它沒有整頁重新載入，所以如果有放在application.js裡面的$(document).ready程式就變成只有第一次載入頁面才執行到，換頁時就失效了。這時候必須改成$(document).on("page:change", function(){ ...})。

如果想要明顯體會它的效果，可以在app/assets/javascripts/application.js裡面加上

Turbolinks.enableProgressBar();
最後，因為它會影響JavaScript的Event Bindings行為，所以在搭配一些JavaScript比較吃重的應用程式，例如使用JavaScript Framework如Backbone、AngularJS、Ember時會移除不用，以免互相影響。













