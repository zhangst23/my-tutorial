實戰聖經-路由(Routing).rb

1.0   路由系統做幾件事情：

1.1. 辨識HTTP Request的URL網址，然後對應到設定的Controller Action。

1.2. 處理網址內的參數字串，例如：/users/show/123送到Users controller的show action時，會將params[:id] 設定為 123

1.3. 辨識link_to和redirect_to的參數產生URL字串，例如

		link_to 'hola!', { :controller=> 'welcome', :action => 'say' }
		會產生

		<a href="/welcome/say">hola!</a>
		Rails這麼彈性的路由功能，可以怎麼用呢？例如設計一個部落格網站，如果是沒有使用框架的CGI或PHP網頁開發，會長得這樣：

		http://example.org/?p=123
		但是如果我們想要將編號放在網址列中呢？

		http://example.org/posts/123
		或是希望根據日期：

		http://example.org/posts/2011/04/21/
		或者是根據不同作者加上文章的標籤(將關鍵字放在網址中有助於SEO)：

		http://example.org/ihower/posts/123-ruby-on-rails
		這些在Rails只需要修改config/routes.rb這一個路由檔案，就可以完全自由自定。讓我們看看有哪些設定方式吧：





2.0   一般路徑Regular Routes



3.0  外卡路由  
# 透過RESTful和Named Route，我們就不再需要透過外卡路由的Hash來指定路由了。所有的路由規則都可以在routes.rb一目了然。


4.0   命名路由Named Routes

5.0  Redirect

6.0   設定首頁
# 要設定網站的首頁，請設定：
root :to => 'welcome#show'


7.0   HTTP動詞(Verb)限定


8.0   Scope 規則

8.1  Scope Module

8.2  領域名稱Namespace



9.0  特殊條件限定




10.0   RESTful路由

10.1  複數資源
resources :events

10.2  單數資源Singular Resoruce
# 除了一般複數型Resources，在單數的使用情境下也可以設定成單數Resource：
resource :map
# 特別之處在於那就沒有index action了，所有的URL Helper也皆為單數形式，顯示出來的網址也是單數

10.3  套疊Nested Resources

10.4  指定Controller
# resource預設採用同名的controller，我們可以改指定，例如

resources :projects do
  resources :tasks, :controller => "project_tasks"
end

10.5  自定群集路由Collection

10.6  自定特定元素路由Member

10.7  限定部分支援

10.8  PATCH v.s. PUT




11   rake routes

如果你不清楚這些路由設定到底最後的規則是什麼，你可以執行：

rake routes




12   常見錯誤

12.1   Routing Error

當URL找不到任何路由規則可以符合時，會出現這個錯誤。例如一個GET的路由，你用button_to送出POST，這樣就不符合規則。

12.2   ActionController::UrlGenerationError

當一個路由Helper的參數不夠的時候，會出現這個錯誤。例如event_path(event)這個方法的event參數不能是nil。如果你打錯成event_path(@events)而@events是個nil，就會出現這個錯誤。





13  結論

透過RESTful和Named Route，我們就不再需要透過外卡路由的Hash來指定路由了。所有的路由規則都可以在routes.rb一目了然。













