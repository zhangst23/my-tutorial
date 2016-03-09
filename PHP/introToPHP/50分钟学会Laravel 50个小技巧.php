50分钟学会Laravel 50个小技巧.php
http://www.yuansir-web.com/2015/12/09/50%E5%88%86%E9%92%9F%E5%AD%A6%E4%BC%9Alaravel-50%E4%B8%AA%E5%B0%8F%E6%8A%80%E5%B7%A7/

Eloquent
1. Automatic model validation
class Post extends Eloquent
{
	public static $autoValidate = true;
	protected static $rules = array();

	protected static function boot()
	{
		parent::boot();
		static::saving(function ($model){
			if($model::$autoValidate){
				return $model->validate();
			}
		});
	}
	public function validate() { }
}


2. Prevent updating
class Post extends Eloquent
{
	protected static function boot()
	{
		parent::boot();
		static::updating(function($model){
			return false;
		})
	}
}

3. Conditional relatiionships
class myModel extends Model
{
	public function category()
	{
		return $this->belongsTo('myCategoryModel', 'categories_id')->where('users_id', Auth::user()->id);
	}
}

4. Expressive where syntax
$products = Product::where('category','=',3)->get();
$products = Product::where('category', 3)->get();
$products = Product::whereCategory(3)->get();


5. Query builder:having raw
SELECT *, COUNT(*) FROM products GROUP BY category_id HAVING count(*) > 1;

DB::table('products')
	->select('*',DB::raw('COUNT(*) as products_count'))
	->groupBy('category_id')
	->having('products_count', '>', 1)
	->get();

Product::groupBy('category_id')->havingRaw('COUNT(*) > 1')->get();

6. Simple date filtering
$q->whereDate('created_at', date('Y-m-d'));
$q->whereDay('created_at', date('d'));
$q->whereMonth('created_at', date('m'));
$q->whereYear('created_at', date('Y'));

7. Save options
