PHP与Mysql：数据库查询之连贯操作.php

(1)
$User->where('status=1')->order('create_time')->limit(10)->select();

$User->order('create_time')->limit(10)->where('status=1')->select();

(2)
$User->where('id=1')->field('id,name,email')->find();
$User->where('status=1 and id=1')->delete();


















