rails new depot  
rails g scaffold Product title:string description:text image_url:string price:decimal  
rake db:migrate  
rake test  
***
在db/seeds.rb里填写伪数据  
rake db:seed
***
修改views/products/index.html.erb页面，使其适合数据插入，并使用方法：cycle  truncate   :method=>:delete  
***
git init  
git add .  
git commit -am"Depot Scaffold"  
***
验证:validates:title, :price, :image_url  
rake test  
测试方法
***
git init  
git add .  
git commit -am"Validation!"  
***
rails g controller store index  
修改 views/store/index.html.erv页面  
增加页面布局views/layouts/application.html.erb
***
_form.html.erb  
css  
test:controller  
***
rails g scaffold cart
rake db:migrate  
将购物车id放在会话中，使用符号:cart_id建立索引(在 application_controller.rb中)  
将产品放到购物车中  
rails g scaffold line_item product_id:integer cart_id:integer  
rake db:migrate  
***
在app/models/cart.rb中添加一个对has_many的调用.  
在app/models/line_item.rb中使用belongs_to 声明  
在 app/models/product.rb中 添加 has_many 和 hook钩子方法(private def ? end)  
***
添加一个按钮 button_to    line_items_path   :product_id  
修改LineItemsController以找到当前会话中的购物车，添加所选产品到购物车中，并显示购物车中的内容。  
修改 test "should create line_item" do  
rake test:functionals  
***
美化 views/carts/show.html.erb页面  
***
小结：   
* 我们在一个请求中创建了一个cart对象，并能够在后续的请求中通过会话对象成功的找到该购物车  
* 我们在所有控制器的基类中添加了一个私有方法，从而使得所有的控制器都可以使用该方法。  
* 我们创建了购物车和在线商品之间的关系以及在线商品和产品之间的关系，并且我们可以通过这些关系进行浏览  
* 我们添加了一个按钮，使得能添加产品到购物车中，同时还创建了一个新的在线商品  
* 

***
更智能的购物车：  
* 修改数据库模式schema与现有数据  
* 诊断和处理错误  
* 闪存  
* 日志  
***
rails g migration add_quantity_to_line_items quantity:integer  
在应用迁移前，把已有的购物车默认值设置为1  def self.up ?  end
rake db:migrate
***
在app/models/cart.rb中添加 add_product  方法  
为了使用查询器方法find_by，还要修改商品项目控制器controllers/line_items_controller.rb中的 def create ? end  
修改 carts/show.html.erb  
***
rails g migration combine_items_in_cart  
填写 self.up 方法-重要代码块  
rake db:migrate  
填写 def self.down 方法  
***
安全问题
错误处理  
修改show方法来拦截那些无效的产品id并报告问题  











