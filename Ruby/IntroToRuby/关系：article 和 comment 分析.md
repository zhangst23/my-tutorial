关系： article 和 comment 分析.md
### 1.0
这个最简单，两张表：
article has_many comments  
comment belongs_to article


### 2.0 
> rails generate model Article title:string text:text

> rails generate model Comment commenter:string body:text article:references

```
class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.text :text
 
      t.timestamps
    end
  end
end
```
```
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :commenter
      t.text :body
 
      # this line adds an integer column called `article_id`.
      t.references :article, index: true
 
      t.timestamps
    end
  end
end
```

```
class Comment < ActiveRecord::Base
  belongs_to :article
end
```

```
resources :articles do
  resources :comments
end
```
```
class Article < ActiveRecord::Base
  has_many :comments
  validates :title, presence: true,
                    length: { minimum: 5 }
end
```



























