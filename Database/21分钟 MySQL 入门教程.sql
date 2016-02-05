21分钟 MySQL 入门教程.sql


1.0   MySQL的相关概念介绍
表头(header)
列(row)
行(col)
值(value)
键(key)


2.0  MySQL脚本的基本组成
标识符
关键字
语句
函数




3.0    MySQL中的数据类型
数字  ：整数：tinyint smallint mediumint int bigint
	   浮点数：float double real decimal

日期\时间 : date time datetime timestamp year

字符串  : 字符串：char varchar
		 文本 ：tinytext text mediumtext longtext
		 二进制(可用来存储图片音乐等) ： tinyblob blob mediumblob longblob



4.0    使用MySQL数据库

4.1  登录到MySql
-- mysql -h 主机名 -u 用户名 -p

-- -h:该命令用于指定客户端索要登录的MySQL主机名，登录当前机器该参数可以省略
-- -u:所要登录的用户名
-- -p:告诉服务器将会使用一个密码来登陆，如果所要登陆的用户名密码为空，可以忽略此选项


4.2   创建一个数据库
create database 数据库名[其它选项];

create database samp_db character set gdk;

create database gregs_list CHARACTER set utf8mb4 COLLATE = utf8mb4_unicode_ci; 创建数据库 gregs_list
show databases; 列出当前所有的数据库
use gregs_list; 使用 gregs_list 这个数据库
create table my_contacts ( last_name varchar(30), first_name varchar(20), email varchar(50), gender char(1), birthday date, profession varchar(50), location varchar(50), status varchar(20), interests varchar(100), seeking varchar(100) ); 创建 my_contacts 表
desc my_contacts; 查看 my_contacts 表
drop table my_contacts; 删除 my_contacts 表
show create table my_contacts; 返回建表的 create table 语句




4.4   创建数据库表

create table 表名称(列声明);

eg:
create table students
(
	id int unsigned not null auto_increment primary key,
	name char(8) not null,
	sex char(4) not null,
	age tinyint unsigned not null,
	tel char(13) null default "_"
);

-- 对于一些较长的语句在命令提示符下可能容易输错, 因此我们可以通过任何文本编辑器将语句输入好后保存为 createtable.sql 的文件中, 通过命令提示符下的文件重定向执行执行该脚本。

-- 打开命令提示符, 输入: 
mysql -D samp_db -u root -p < createtable.sql



4.4.1  语句解说:
create table tablename(columns) 为创建数据库表的命令, 列的名称以及该列的数据类型将在括号内完成;
-- 括号内声明了5列内容, id、name、sex、age、tel为每列的名称, 后面跟的是数据类型描述, 列与列的描述之间用逗号(,)隔开;

以 "id int unsigned not null auto_increment primary key" 行进行介绍:

"id" 为列的名称;
"int" 指定该列的类型为 int(取值范围为 -8388608到8388607), 在后面我们又用 "unsigned" 加以修饰, 表示该类型为无符号型, 此时该列的取值范围为 0到16777215;
"not null" 说明该列的值不能为空, 必须要填, 如果不指定该属性, 默认可为空;
"auto_increment" 需在整数列中使用, 其作用是在插入数据时若该列为 NULL, MySQL将自动产生一个比现存值更大的唯一标识符值。在每张表中仅能有一个这样的值且所在列必须为索引列。
"primary key" 表示该列是表的主键, 本列的值必须唯一, MySQL将自动索引该列。
下面的 char(8) 表示存储的字符长度为8, tinyint的取值范围为 -127到128, default 属性指定当该列值为空时的默认值。






5.0   操作MySQL数据库

5.1  向表中插入数据
insert [into] 表名 [(列名1, 列名2, 列名3, ...)] values (值1, 值2, 值3, ...);
insert into students values(NULL, "王刚", "男", 20, "13811371377");


INSERT INTO table (col1, col2, ..., coln)
SELECT col1, col2, ..., coln
FROM table
WHERE entry_date < '2011-01-01 00:00:00';



5.2   查询表中的数据

select 列名称 from 表名称 [查询条件];
-- 例如要查询 students 表中所有学生的名字和年龄, 输入语句 select name, age from students; 执行结果如下:
mysql> select name, age from students;


5.3   按特定条件查询:
-- where 关键词用于指定查询条件, 用法形式为: select 列名称 from 表名称 where 条件;
-- 以查询所有性别为女的信息为例, 输入查询语句: select * from students where sex="女";
-- where 子句不仅仅支持 "where 列名 = 值" 这种名等于值的查询形式, 对一般的比较运算的运算符都是支持的, 例如 =、>、<、>=、<、!= 以及一些扩展运算符 is [not] null、in、like 等等。 还可以对查询条件使用 or 和 and 进行组合查询, 以后还会学到更加高级的条件查询方式, 这里不再多做介绍。

-- 示例:
-- 查询年龄在21岁以上的所有人信息: select * from students where age > 21;
-- 查询名字中带有 "王" 字的所有人信息: select * from students where name like "%王%";
-- 查询id小于5且年龄大于20的所有人信息: select * from students where id<5 and age>20;



5.4    更新表中的数据
update 语句可用来修改表中的数据, 基本的使用形式为:
update 表名称 set 列名称=新值 where 更新条件;

-- 使用示例:
-- 将id为5的手机号改为默认的"-": 
update students set tel=default where id=5;
-- 将所有人的年龄增加1: 
update students set age=age+1;
-- 将手机号为 13288097888 的姓名改为 "张伟鹏", 年龄改为 19: 
update students set name="张伟鹏", age=19 where tel="13288097888";



5.5    删除表中的数据
delete 语句用于删除表中的数据, 基本用法为:
delete from 表名称 where 删除条件;
-- 使用示例:
-- 删除id为2的行: 
delete from students where id=2;
-- 删除所有年龄小于21岁的数据: 
delete from students where age<20;
-- 删除表中的所有数据: 
delete from students;






6.0   创建后表的修改
alter table 语句用于创建后对表的修改, 基础用法如下:

6.1  添加列
基本形式: alter table 表名 add 列名 列数据类型 [after 插入位置];
-- 示例:
-- 在表的最后追加列 address: 
alter table students add address char(60);
-- 在名为 age 的列后插入列 birthday: 
alter table students add birthday date after age;

6.2   修改列
基本形式: alter table 表名 change 列名称 列新名称 新数据类型;
-- 示例:
-- 将表 tel 列改名为 telphone: 
alter table students change tel telphone char(13) default "-";
-- 将 name 列的数据类型改为 char(16): 
alter table students change name name char(16) not null;

6.3   删除列
基本形式: alter table 表名 drop 列名称;
-- 示例:
-- 删除 birthday 列: 
alter table students drop birthday;

6.4   重命名表
基本形式: alter table 表名 rename 新表名;
-- 示例:
-- 重命名 students 表为 workmates: 
alter table students rename workmates;

6.5    删除整张表
基本形式: drop table 表名;
-- 示例: 删除 workmates 表: 
-- drop table workmates;

6.6    删除整个数据库
基本形式: drop database 数据库名;
-- 示例: 删除 samp_db 数据库: 
drop database samp_db;



7.0 
-- 修改 root 用户密码
-- 按照本文的安装方式, root 用户默认是没有密码的, 重设 root 密码的方式也较多, 这里仅介绍一种较常用的方式。
-- 使用 mysqladmin 方式:
-- 打开命令提示符界面, 执行命令: 
mysqladmin -u root -p password 新密码



7.1
可视化管理工具 MySQL Workbench
尽管我们可以在命令提示符下通过一行行的输入或者通过重定向文件来执行mysql语句, 但该方式效率较低, 由于没有执行前的语法自动检查, 输入失误造成的一些错误的可能性会大大增加, 这时不妨试试一些可视化的MySQL数据库管理工具, MySQL Workbench 就是 MySQL 官方 为 MySQL 提供的一款可视化管理工具, 你可以在里面通过可视化的方式直接管理数据库中的内容, 并且 MySQL Workbench 的 SQL 脚本编辑器支持语法高亮以及输入时的语法检查, 当然, 它的功能强大, 绝不仅限于这两点。


8.0

mysqldump -u wcnc -p smgp_apps_wcnc > wcnc.sql

mysqldump -u wcnc -p -d -add-drop-table smgp_apps_wcnc >d:wcnc_db.sql

mysqldump -u wcnc -p -d -add-drop-table smgp_apps_wcnc >d:wcnc_db.sql

mysql -u root -p

mysql>source wcnc_db.sql

creat database xhkdb

show databases

drop database xhkdb

use xhkdb

select database()

create table Myclass(
id int(4) not null primary key auto_increment,
name char(20) not null,
sex int(4) not null default '0',
degree double(16,2));

DESCRIBE MyClass
desc MyClass
show columns from MyClass

drop table MyClass

insert into MyClass values(1,'Tom',96.45),(2,'Joan',82.99),(2,'wang',96);

select * from MyClass;

select * from MyClass order by id limit 0,2;

select * from MyClass limit 0,2;

delete from MyClass where id=1;

update MyClass set name='Mary' where id=1;

alter table MyClass add passtest int(4) default '0'

rename table MyClass to YouClass

update article set content=concat('',content);

#
describe 表名

#
create database 库名

#
use 库名
create table 表名

#
use xhkdb

select database()

select version()

select now()

SELECT DAYOFMONTH(CURRENT_DATE)

#
delete from MyClass where id=1;






























































































