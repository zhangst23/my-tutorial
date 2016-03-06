laravel-数据库-Eloquent ORM.php

1.0 基本用法
1.1 定义一个 Eloquent 模型
class User extends Model {}
<!-- 你也可以通过 make:model 命令自动生成 Eloquent 模型： -->
php artisan make:model User

1.2 取出所有记录
$users = User::all();

1.3根据主键取出一条数据
$user = User::find(1);
var_dump($user->name)

1.4 根据主键取出一条数据或抛出异常
<!-- 有时, 您可能想要在找不到模型数据时抛出异常，通过 firstOrFail 方法。 -->
$model = User::findOrFail(1);
$model = User::where('votes', '>', 100) -> firstOrFail();

1.5 Eloquent 模型结合查询语法
$users = User::where('votes', '>', 100)->take(10)->get()

foreach ($users as $user)
{
var_dump($user->name);
}

1.6 Eloquent 聚合查询
$count = User::where('votes', '>', 100)->count();
<!--  -->
$users = User::whereRaw('age > ? and votes = 100', [25]) -> get();

1.7 拆分查询
User::chunk(200, function($users){
	foreach ($users as $user)
	{
		//
	}
})

1.8 指定查询时连接数据库
$user = User::on('connection-name') -> find(1);
<!-- 如果您在使用 读取 / 写入连接, 您可以通过如下命令来强制查询使用 写入 连接： -->
$user = User::onWriteConnection() -> find(1)




2.0 批量赋值
2.1 定义模型 Fillable 属性
class User extends Model {
	protected $fillable = ['first_name', 'last_name', 'email'];
}

2.2 定义模型 Guarded 属性
class User extends Model {
	protected $guarede = ['id', 'password'];
}

2.3 阻挡所有属性被批量赋值
protected $guarded = ['*'];


3.0 新增 更新 删除

3.1 储存新的模型数据
$user = new User;
$user->name = 'John';
$user->save();
<!-- 在新模型数据被储存或新增后，若模型有自动递增主键，可以从对象取得 id 属性值： -->
$insertedId = $user->id

3.2 在模型里设定 Guarded 属性
class User extends Model {
	protected $guarded = ['id', 'account_id'];
}

3.3 使用模型的 Create 方法
<!-- // 在数据库中建立一个新的用户... -->
$user = User::create(['name' => 'John']);
$user = User::create(['name' => 'John']);

<!-- // 以属性找用户，若没有则新增并取得新的实例... -->
$user = User::firstOrCreate(['name' => 'John']);
$user = User::firstOrCreate(['name' => 'John']);

<!-- // 以属性找用户，若没有则建立新的实例... -->
$user = User::firstOrNew(['name' => 'John']);
$user = User::firstOrNew(['name' => 'John']);

3.4 更新取出的模型
$user = User::find(1);
$user->email = 'john@foo.com';
$user->save();

3.5 储存模型和关联数据
$user -> push();
$affectedRows = User::where('votes', '>', 100)->update(['status' => 2]);

3.6 删除模型
$user = User::find(1);
$user->delete();

3.7 按主键值删除模型
User::destroy(1)

3.8 只更新模型的时间戳
$user->touch()


4.0 软删除
4.1
use Illuminate\Database\Eloquent\SoftDeletes

class User extends Model {
	use SoftDeletes;
	protected $dates = ['deleted_at'];
}

<!-- 要加入 deleted_at 字段到数据库表，可以在迁移文件里使用 softDeletes 方法： -->
$table->softDeletes();

4.2 强制查询软删除数据
$users = User::withTrashed()->where('account_id', 1)->get();
<!-- withTrashed 也可以用在关联查询： -->
$user->posts()->withTrashed()->get();
<!-- 如果您只想查询被软删除的模型数据，可以使用 onlyTrashed 方法： -->
$users = User::onlyTranshed()->where('account_id', 1)->get();
<!-- 要把被软删除的模型数据恢复，使用 restore 方法： -->
$user->restore()
User::withTranshed()->where('account_id', 1)->restore();
$user->posts()->restore();
$user->forceDelete();
$user->posts()->forceDelete();
if ($user->transhed())
{
	//
}



5.0 时间戳


6. 范围查询
6.1 定义范围查询
class User extends Model {
	public function scopePopular($query)
	{
		return $query->where('votes', '>', 100);
	}

	public function scopeWomen($query)
	{
		return $query->whereGender('W');
	}
}

6.2 使用范围查询
$users = User::popular()->women()->orderBy('created_at')->get();

6.3 动态范围查询
class User extends Model {
	public fundtion scopeOfType($query, $type)
	{
		return $query->whereType($type);
	}
}
然后把参数值传到范围查询方法调用里：
$users = User::ofType('member')->get();



7.0  Global Scopes







8.0 关联
8.1 一对一
8.1.1定义一对一关联
class User extends Model {
	public function phone()
	{
		return $this->hasOne('App\Phone');
	}
}

<!-- 传到 hasOne 方法里的第一个参数是关联模型的类名称。定义好关联之后，就可以使用 Eloquent 的动态属性取得关联对象： -->
$phone = User::find(1)->phone;


8.1.2 定义相对的关联
class Phone extends Model {
	public function user()
	{
		return $this->belongsTo('App\User');
	}
}

<!-- 在上面的例子里， Eloquent 默认会使用 phones 数据库表的 user_id 字段查询关联。如果想要自己指定外键字段，可以在 belongsTo 方法里传入第二个参数： -->

class Phone extends Model {

    public function user()
    {
        return $this->belongsTo('App\User', 'local_key');
    }

}
<!-- 除此之外，也可以传入第三个参数指定要参照上层数据库表的哪个字段： -->

class Phone extends Model {

    public function user()
    {
        return $this->belongsTo('App\User', 'local_key', 'parent_key');
    }

}

8.2 一对多
class Post extends Model {
	public function comments()
	{
		return $this->hasMany('App\Comment');
	}
}
<!-- 现在可以经由动态属性取得文章的评论： -->
$comments = Post::find(1)->comments;
<!-- 如果需要增加更多条件限制，可以在调用 comments 方法后面通过链式查询条件方法： -->
$comments = Post::find(1)->comments()->where('title', '=', 'foo')->first();
<!-- 同样的，您可以传入第二个参数到 hasMany 方法更改默认的外键名称。以及，如同 hasOne 关联，可以指定本身的对应字段： -->
return $this->hasMany('App\Comment', 'foreign_key');

return $this->hasMany('App\Comment', 'foreign_key', 'local_key');

8.2.2 定义相对的关联

<!-- 要在 Comment 模型定义相对应的关联，可使用 belongsTo 方法： -->

class Comment extends Model {

    public function post()
    {
        return $this->belongsTo('App\Post');
    }

}



8.3  多对多
<!-- 多对多关联更为复杂。这种关联的例子如，一个用户（ user ）可能用有很多身份（ role ），而一种身份可能很多用户都有。例如很多用户都是「管理者」。多对多关联需要用到三个数据库表： users ， roles ，和 role_user 。 role_user 枢纽表命名是以相关联的两个模型数据库表，依照字母顺序命名，枢纽表里面应该要有 user_id 和 role_id 字段。
可以使用 belongsToMany 方法定义多对多关系： -->

class User extends Model {
	public function roles()
	{
		return $this->belongsToMany('App\Role');
	}
}
<!-- 现在我们可以从 User 模型取得 roles： -->
$roles = User::find(1)->roles;
<!-- 如果不想使用默认的枢纽数据库表命名方式，可以传递数据库表名称作为 belongsToMany 方法的第二个参数： -->
return $this->belongsToMany('App\Role', 'user_roles', 'user_id', 'foo_id');
<!-- 当然，也可以在 Role 模型定义相对的关联： -->
class Role extends Model {

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

}



8.4  Has Many Through 远层一对多关联
<!-- 「远层一对多关联」提供了方便简短的方法，可以经由多层间的关联取得远层的关联。例如，一个 Country 模型可能通过 Users 关联到很多 Posts 模型。 数据库表间的关系可能看起来如下： -->
<!-- 虽然 posts 数据库表本身没有 country_id 字段，但 hasManyThrough 方法让我们可以使用 $country->posts 取得 country 的 posts。我们可以定义以下关联： -->
class Country extends Model {
	public function posts()
	{
		return $this->hasManyThrough('App\Post', 'App\User');
	}
}

<!-- 如果想要手动指定关联的字段名称，可以传入第三和第四个参数到方法里： -->
return $this->hasManyThrough('App\Post', 'App\User', 'country_id', 'user_id');


8.5  多态关联

<!-- 多态关联可以用一个简单的关联方法，就让一个模型同时关联多个模型。例如，您可能想让 photo 模型同时和一个 staff 或 order 模型关联。可以定义关联如下： -->



8.6 多态的多对多关联





9.0  关联查询
9.1 根据关联条件查询
$posts = Post::has('comments')->get();

$posts = Post::has('comments', '>=', 3)->get();

9.2 动态熟悉



10.0  预载入
<!-- 预载入是用来减少 N + 1 查询问题。例如，一个 Book 模型数据会关联到一个 Author 。关联会像下面这样定义： -->
class Book extends Model {

    public function author()
    {
        return $this->belongsTo('App\Author');
    }

}
<!-- 现在考虑下面的代码： -->
foreach (Book::all() as $book)
{
    echo $book->author->name;
}

<!-- 很幸运地，我们可以使用预载入大量减少查询次数。使用 with 方法指定想要预载入的关联对象： -->
foreach (Book::with('author')->get() as $book)
{
	echo $book -> author->name;
}

<!-- 当然，也可以同时载入多种关联： -->
$books = Book::with('author', 'publisher')->get();
<!-- 甚至可以预载入巢状关联： -->
$books = Book::with('author.contacts')->get();








11 新增关联模型
11.1 附加一个关联模型
<!-- 您常常会需要加入新的关联模型。例如新增一个 comment 到 post 。除了手动设定模型的 post_id 外键，也可以从上层的 Post 模型新增关联的 comment ： -->
$comment = new Comment(['message' => 'A new comment.'])
$post = Post::find(1);
$comment = $post->comments()->save($comment);









































