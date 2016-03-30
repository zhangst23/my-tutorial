关系： order 和 Product 分析.md

# 4 张表
### 1.0
表1: products : name | price | active
表2: orders : subtotal | tax | shipping | total | order_status(references)
表3: order_items : product_id(references) | order_id(references) | unit_price | total_price | quantity
表4: order_status : name

### 2.0
product <----belongs_to/has_many-----> order_item <----has_many/belongs_to-----> order

order <-----belongs_to/has_many-----> order_status


# models
### 1.0
rails g model Product name 'price:decimal{12,3}' active:boolean
rails g model OrderStatus name:string
rails g model Order 'subtotal:decimal{12,3}' 'tax:decimal{12,3}' 'shipping:decimal{12,3}' 'total:decimal{12,3}' order_status:references
rails g model OrderItem product:references order:references 'unit_price:decimal{12,3}' quantity:integer 'total_price:decimal{12,3}'
rake db:migrate

### 2.0
```
app/models/order.rb:

class Order < ActiveRecord::Base
  belongs_to :order_status
  has_many :order_items
  before_create :set_order_status
  before_save :update_subtotal

  def subtotal
    order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
  end
private
  def set_order_status
    self.order_status_id = 1
  end

  def update_subtotal
    self[:subtotal] = subtotal
  end
end
```

```
app/models/order_item.rb:

class OrderItem < ActiveRecord::Base
  belongs_to :product
  belongs_to :order

  validates :quantity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validate :product_present
  validate :order_present

  before_save :finalize

  def unit_price
    if persisted?
      self[:unit_price]
    else
      product.price
    end
  end

  def total_price
    unit_price * quantity
  end

private
  def product_present
    if product.nil?
      errors.add(:product, "is not valid or is not active.")
    end
  end

  def order_present
    if order.nil?
      errors.add(:order, "is not a valid order.")
    end
  end

  def finalize
    self[:unit_price] = unit_price
    self[:total_price] = quantity * self[:unit_price]
  end
end
```

```
app/models/order_status.rb:

class OrderStatus < ActiveRecord::Base
  has_many :orders
end
```

```
app/models/product.rb:

class Product < ActiveRecord::Base
  has_many :order_items

  default_scope { where(active: true) }
end
```



# controllers 

```
rails g controller Products index
rails g controller Carts show
rails g controller OrderItems create update destroy
```

```
app/controllers/application_controller.rb:

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_order

  def current_order
    if !session[:order_id].nil?
      Order.find(session[:order_id])
    else
      Order.new
    end
  end
end
```


```
app/controllers/carts_controller.rb:

class CartsController < ApplicationController
  def show
    @order_items = current_order.order_items
  end
end
```


```
app/controllers/order_items_controller.rb:

class OrderItemsController < ApplicationController
  def create
    @order = current_order
    @order_item = @order.order_items.new(order_item_params)
    @order.save
    session[:order_id] = @order.id
  end

  def update
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.update_attributes(order_item_params)
    @order_items = @order.order_items
  end

  def destroy
    @order = current_order
    @order_item = @order.order_items.find(params[:id])
    @order_item.destroy
    @order_items = @order.order_items
  end
private
  def order_item_params
    params.require(:order_item).permit(:quantity, :product_id)
  end
end
```

```
app/controllers/products_controller.rb:

class ProductsController < ApplicationController
  def index
    @products = Product.all
    @order_item = current_order.order_items.new
  end
end
```

# routes.rb:
```
Rails.application.routes.draw do
  resources :products, only: [:index]
  resource :cart, only: [:show]
  resources :order_items, only: [:create, :update, :destroy]
  root to: "products#index"
end
```


# html
```
app/views/layouts/application.html.erb:

<!DOCTYPE html>
<html>
<head>
  <title>ShoppingCartExample</title>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <% if request.ssl? %>
    <%= stylesheet_link_tag 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css' %>
    <%= javascript_include_tag 'https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js' %>
  <% else %> 
    <%= stylesheet_link_tag 'http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css' %>
    <%= javascript_include_tag 'http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js' %>
  <% end %>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  
  <%= csrf_meta_tags %>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-xs-6">
        <h1><%= link_to "My Store", root_path %></h1>
      </div>
      <div class="col-xs-6 text-right">
        <h1 class="cart-text"><%= render 'layouts/cart_text' %></h1>
      </div>
    </div>
    <hr>
    <%= yield %>
  </div>

</body>
</html>
```

```
app/views/layouts/_cart_text.html.erb:

<%= link_to "#{current_order.order_items.size} Items in Cart ( #{number_to_currency current_order.subtotal} )", cart_path, class: "btn btn-link" %>
```

```
app/views/carts/show.html.erb:

<div class="shopping-cart">
  <%= render "shopping_cart" %>
</div>

```

```
app/views/carts/_shopping_cart.html.erb:

<% if !@order_item.nil? && @order_item.errors.any? %>
  <div class="alert alert-danger">
    <ul>
    <% @order_item.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>
<% if @order_items.size == 0 %>
  <p class="text-center">
    There are no items in your shopping cart.  Please <%= link_to "go back", root_path %> and add some items to your cart.
  </p>
<% else %>
  <% @order_items.each do |order_item| %>
    <%= render 'carts/cart_row', product: order_item.product, order_item: order_item, show_total: true %>
  <% end %>
<% end %>

```

```
app/views/carts/_cart_row.html.erb:

<div class="well">

  <div class="row">
    <div class="col-xs-8">
      <h4><%= product.name %></h4>
    </div>
    <div class="col-xs-4">
      
      <%= form_for order_item, remote: true do |f| %>
        <h4 class="text-right">Unit Price: <span style="color: green"><%= number_to_currency order_item.unit_price %></span></h4>
        <div class="row">
          <div class="col-xs-4">
            <%= f.number_field :quantity, value: order_item.quantity.to_i, class: "form-control", min: 1 %>
            <%= f.hidden_field :product_id, value: product.id %>
          </div>
          <div class="col-xs-8 text-right">
            <div class="btn-group">
              <%= f.submit "Update Quantity", class: "btn btn-primary" %>
              <%= link_to "Delete", order_item, { data: { confirm: "Are you sure you wish to delete the product '#{order_item.product.name}' from your cart?" }, method: :delete, remote: true, class: "btn btn-danger" } %>
            </div>
          </div>
        </div>
        <h4 class="text-right">Total Price: <span style="color: green"><%= number_to_currency order_item.total_price %></span></h4>
      <% end %>
    </div>
    
  </div>
</div>
```

```

app/views/order_items/create.js.erb:

<% if @order.errors.any? || @order_item.errors.any? %>
alert("not valid.")
<% else %>
  $(".cart-text").html("<%= escape_javascript(render 'layouts/cart_text') %>")
<% end %>
```
```
app/views/order_items/destroy.js.erb:

$(".cart-text").html("<%= escape_javascript(render 'layouts/cart_text') %>")
$(".shopping-cart").html("<%= escape_javascript(render 'carts/shopping_cart') %>")
```

```
app/views/order_items/update.js.erb:

$(".cart-text").html("<%= escape_javascript(render 'layouts/cart_text') %>")
$(".shopping-cart").html("<%= escape_javascript(render 'carts/shopping_cart') %>")

```

```
app/views/products/index.html.erb:

<h3 class="text-center">Products for Sale</h3>

<div class="row">
  <div class="col-xs-6 col-xs-offset-3">
    <% @products.each do |product| %>
      <%= render "product_row", product: product, order_item: @order_item %>
    <% end %>
  </div>
</div>

```

```
app/views/products/_product_row.html.erb:

<div class="well">

  <div class="row">
    <div class="col-xs-8">
      <h4><%= product.name %></small></h4>
    </div>
    <div class="col-xs-4">
      
      <%= form_for order_item, remote: true do |f| %>
      <h4 class="text-right">Unit Price: <span style="color: green"><%= number_to_currency product.price %></span></h4>
        <div class="input-group">
          <%= f.number_field :quantity, value: 1, class: "form-control", min: 1 %>
          <div class="input-group-btn">
            <%= f.hidden_field :product_id, value: product.id %>
            <%= f.submit "Add to Cart", class: "btn btn-primary" %>
          </div>
        </div>
      <% end %>
    </div>
    
  </div>
</div>
```


















