laravel-迁移和数据填充.php

1.0 建立迁移文件
php artisan make:migration create_users_table

<!-- 参数 -->
php artisan make:migration add_votes_to_users_table --table=users
php artisan make:migration create_users_table --create=users


2.0 执行迁移
php artisan migrate
<!-- error: class not found -->
composer dump-autoload
<!-- 在线上环境Production中强制执行迁移 -->
php artisan migrate --force

3.0 回滚迁移
php artisan migrate:rollback

php artisan migrate:reset

php artisan migrate:refresh
php artisan migrate:refresh --seed


4.0 数据填充

4.0 Seed类例子
class DatabaseSeeder extends Seeder {
	public function run()
	{
		$this -> call('UserTableSeeder');
		$this -> command -> info('User table seeded!')
	}

}
class UserTableSeeder extends Seeder {
	public function run()
	{
		DB::table('users')->delete();
		User::create(['email' => 'foo@bar.com']);
	}
}

<!-- 执行 db:seed -->
php artisan db:seed

<!-- 默认 db:seed 命令会执行 DatabaseSeeder，可以使用它来调用其他 seed 类，不过，也可以使用 --class 参数指定要单独执行的类： -->
php artisan db:seed --class=UserTableSeeder
<!-- 你也可以使用 migrate:refresh 命令填充数据，它会回滚并且再次执行所有迁移： -->
php artisan migrate:refresh --seed























