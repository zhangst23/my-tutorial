PostgresSQL学习笔记.sql


3.4 事务

-- 事务被认为是原子的： 从其它事务的角度来看，它要么是全部发生，要么完全不发生。
-- 比如，假设一个银行的数据库包含各种客户帐户的余额，以及每个分行的总余额。 假设我们要记录一次从 Alice 的帐户到 Bob 的帐户的金额为 $100.00 的支付动作。 那么，完成这个任务的简单到极点的 SQL 命令像下面这样：
-- 在PostgreSQL里，一个事务是通过把 SQL 命令用BEGIN和COMMIT 命令包围实现的。因此我们的银行事务实际上看起来像下面这样：
BEGIN;
UPDATE accounts SET balance = balance - 100.00
	WHERE name = 'Alice';
-- 等等
COMMIT;

-- 一组包围在BEGIN和COMMIT 之间的语句有时候被称做事务块

-- 记得我们的银行数据库吗? 假设我们从 Alice 的帐户上消费 $100.00 ，然后给 Bob 的帐户进行加款， 稍后我们发现我们应该给 Wally 的账号加款。那么我们可以像下面这样使用保存点：
BEGIN;
UPDATE accounts SET balance = balance - 100.00
	WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
	WHERE name = 'Bob';
	-- 呀！加错钱了，应该用 Wally 的账号加款。那么我们可以像下面这样使用保存点：
ROLLBACK TO my_savepoint
UPDATE accounts SET balance = balance + 100.00
	WHERE name = 'Wally';
COMMIT;



3.5. 窗口函数
-- 窗口函数在和当前行相关的一组表行上执行计算。 这相当于一个可以由聚合函数完成的计算类型。但不同于常规的聚合函数， 使用的窗口函数不会导致行被分组到一个单一的输出行；行保留其独立的身份。 在后台，窗口函数能够访问的不止查询结果的当前行。
-- 这里是一个例子，说明如何比较每个员工的工资和在他或她的部门的平均工资：

SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary

-- 前三输出列直接来自表empsalary，并有一个针对表中的每一行的输出行。 第四列将代表所有含有相同的depname值的表行的平均值作为当前值。 （这实际上与标准avg聚合函数的功能相同， 但是OVER子句使其被视为一个窗口函数并在一组合适的行上执行计算。）

-- 窗口函数的调用总是包含一个OVER子句，后面直接跟着窗口函数的名称和参数。 这是它在语法上区别于普通函数或聚合功能的地方。 OVER子句决定如何将查询的行进行拆分以便给窗口函数处理。 OVER子句内的PARTITION BY列表指定将行划分成组或分区， 组或分区共享相同的PARTITION BY表达式的值。 对于每一行，窗口函数在和当前行落在同一个分区的所有行上进行计算。

-- 你还可以使用窗口函数OVER内的ORDER BY来控制行的顺序。 （ORDER BY窗口甚至不需要与行的输出顺序相匹配。）下面是一个例子：

SELECT depname, empno, salary, rank() OVER (PARTITION BY depname ORDER BY salary DESC) FROM empsalary;



3.6. 继承
-- 继承是面向对象的数据库的概念。它开启了数据库设计的有趣的新的可能性。

-- 让我们创建两个表：一个cities表和一个capitals表。 自然，首府(capital)也是城市(cities)，
CREATE TABLE cities (
	name		text,
	population	real,
	altitude 	int
);

CREATE TABLE capital (
	state		char(2)
)	INHERITS (cities)

-- 在这个例子里，capitals继承了其父表 cities的所有字段(name,population 和altitude)。字段name的类型text是 PostgreSQL用于变长字符串的固有类型。州首府有一个额外的字段 state显示其所处的州。在PostgreSQL里， 一个表可以从零个或者更多其它表中继承过来。

-- 比如，下面的查询找出所有海拔超过 500 英尺的城市的名字，包括州首府：
SELECT name, altitude
	FROM cities
	WHERE altitude > 500;




4. SQL语法
4.1. 词法结构
SELECT * FROM MY_TABLE
UPDATE MY_TABLE SET A = 5;
INSERT INTO MY_TABLE VALUES (3, 'hi there');
4.1.1. 标识符和关键字
4.1.2. 常量
4.1.3. 操作符
4.1.4. 特殊字符
4.1.5. 注释
4.1.6. 操作符优先级


4.2. 值表达式
4.2.1. 字段引用
correlation.columnnname
4.2.2. 位置参数
$number
#
CREATE FUNCTION dept(text) RETURNS dept
	AS $$ SELECT * FROM dept WHERE name = $1 $$
	LANGUAGE SQL;


4.2.3. 下标
expression[subscript]
expression[lower_subscript:upper_subscript]
4.2.4. 字段选择
expression.fieldname
mytable.mycolumn
$1.somecolumn
(rowfunction(a,b)).col3

4.2.5. 操作符调用
expression operator expression
operator expression
expression operator
4.2.6. 函数调用
function_name([expression [, expression ... ]])
sqrt(2)
4.2.7. 聚合表达式
4.2.8. 窗口调用函数
4.2.9. 类型转换
4.2.10. 排序规则表达式
4.2.11. 标量子查询
4.2.12. 数组构造器
4.2.13. 行构造器
4.2.14. 表达式计算规则


5. 数据定义
5.1. 表的基本概念

CREATE TABLE my_first_table (
	first_column text,
	second_column integer
)

CREATE TABLE products (
	product_no integer,
	name text,
	price numeric
)

DROP TABLE my_first_table;
DROP TABLE products;


5.2. 缺省值

-- 一个字段可以赋予缺省值。如果新创建了一个数据行，而有些字段的数值没有声明， 那么这些字段将被填充为它们各自的缺省值。 一条数据修改命令也可以明确地要求把一个字段设置为它的缺省值，而不用事先知道这个缺省值是什么。 有关数据操作的命令在第 6 章。

-- 如果没有明确声明缺省值，那么缺省值是 NULL 。这么做通常是合理的，因为 NULL 表示"未知"。

-- 在一个表定义里，缺省值是在字段数据类型后面列出的。比如：

CREATE TABLE products (
	product_no integer,
	name text,
	price numeric DEFAULT 9.99
)


5.3. 约束
-- 数据类型是限制我们可以在表里存储什么数据的一种方法。不过，对于许多应用来说， 这种限制实在是太粗糙了。比如，一个包含产品价格的字段应该只接受正数。 但是没有哪种标准数据类型只接受正数。 另外一个问题是你可能需要根据其它字段或者其它行的数据来约束字段数据。比如， 在一个包含产品信息的表中，每个产品编号都应该只有一行。
5.3.1. 检查约束
CREATE TABLE products (
	product_no integer,
	name text,
	price numeric CHECK (price > 0)
)
5.3.2. 非空约束
CREATE TABLE products (
	product_no integer NOT NULL,
	name text NOT NULL,
	price numeric
)
5.3.3. 唯一约束
-- 唯一约束保证在一个字段或者一组字段里的数据与表中其它行的数据相比是唯一的。它的语法是
CREATE TABLE products (
	product_no integer UNIQUE,
	name text,
	price numeric
)
-- 上面是写成字段约束，下面这个则写成表约束：
CREATE TABLE products (
	product_no integer,
	name text,
	price numeric,
	UNIQUE (product_no)
)
-- 如果一个唯一约束引用一组字段，那么这些字段用逗号分隔列出：
CREATE TABLE products (
	a integer,
	b integer,
	c integer,
	UNIQUE (a, c)
)
5.3.4. 主键
-- 从技术上讲，主键约束只是唯一约束和非空约束的组合。所以，下面两个表定义是等价的：
CREATE TABLE products (
    product_no integer UNIQUE NOT NULL,
    name text,
    price numeric
);
CREATE TABLE products (
    product_no integer PRIMARY KEY,
    name text,
    price numeric
);
-- 主键也可以约束多于一个字段；其语法类似于唯一约束：
CREATE TABLE example (
    a integer,
    b integer,
    c integer,
    PRIMARY KEY (a, c)
);
5.3.5. 外键
-- 外键约束声明一个字段(或者一组字段)的数值必须匹配另外一个表中出现的数值。 我们把这个行为称为两个相关表之间的参照完整性。
-- 假设你有个产品表，我们可能使用了好几次：
CREATE TABLE products (
	product_no integer PRIMARY KEY,
	name text,
	price numeric
);
-- 假设你有一个存储这些产品的订单的表。我们想保证订单表只包含实际存在的产品。 因此我们在订单表中定义一个外键约束引用产品表：
CREATE TABLE orders (
	order_id integer PRIMARY KEY,
	product_no integer REFERENCES products (product_no),
	quantity integer
);
-- 现在，我们不能创建任何其非空product_no记录没有在产品表中出现的订单。
-- 在这种情况下我们把订单表叫做引用表， 而产品表叫做被引用表。同样，也有引用字段和被引用字段。
-- 你也可以把上面的命令简写成：

CREATE TABLE orders (
    order_id integer PRIMARY KEY,
    product_no integer REFERENCES products,
    quantity integer
);

???

5.3.6. 排除约束
5.4. 系统字段

5.5. 修改表
5.5.1. 增加字段
ALTER TABLE products ADD COLUMN description text;
-- 你也可以同时在该字段上定义约束，使用通常的语法：
ALTER TABLE products ADD COLUMN description text CHECK (description <> '');
5.5.2. 删除字段
ALTER TABLE products DROP COLUMN description;
-- 不管字段里有啥数据，都会消失，和这个字段相关的约束也会被删除。不过， 如果这个字段被另一个表的外键约束所引用，PostgreSQL 则不会隐含地删除该约束。你可以通过使用CASCADE指明删除任何依赖该字段的东西：
ALTER TABLE products DROP COLUMN description CASCADE;
5.5.3. 增加约束
ALTER TABLE products ADD CHECK (name <> '');
ALTER TABLE products ADD CONSTRAINT some_name UNIQUE (product_no);
ALTER TABLE products ADD FOREIGN KEY (product_group_id) REFERENCES product_groups;

-- 要增加一个不能写成表约束的非空约束，使用下面的语法：
ALTER TABLE products ALTER COLUMN product_no SET NOT NULL;
-- 这个约束将立即进行检查，所以表在添加约束之前必须符合约束条件。

5.5.4. 删除约束
-- 要删除一个约束，你需要知道它的名字。如果你曾经给了它取了名字， 那么事情就很简单。否则你就需要找出系统自动分配的名字。psql 的命令\d tablename可以帮这个忙； 其它接口可能也提供了检查表的细节的方法。然后就是这条命令：
ALTER TABLE products DROP CONSTRAINT some_name;
除了非空约束外，所有约束类型都这么用。要删除非空约束，可以这样：

ALTER TABLE products ALTER COLUMN product_no DROP NOT NULL;

5.5.5. 改变字段的缺省值
5.5.6. 修改字段的数据类型
5.5.7. 重命名字段
ALTER TABLE products RENAME COLUMN product_no TO product_number;
5.5.8. 重命名表
ALTER TABLE products RENAME TO items;
5.6. 权限
-- 使用GRANT命令赋予权限。例如，如果joe是一个已经存在的用户， 而accounts是一个已经存在的表，更新表的权限可以用下面的命令赋予：
GRANT UPDATE ON accounts TO joe;

-- 可以使用REVOKE命令撤销权限：
REVOKE ALL ON accounts FROM PUBLIC;

5.7. 模式
-- 一个PostgreSQL数据库集群包含一个或多个已命名数据库。 用户和用户组在整个集群范围内是共享的，但是其它数据并不共享。 任何与服务器连接的客户都只能访问那个在连接请求里声明的数据库。

-- 注意: 集群中的用户并不一定要有访问集群内所有数据库的权限。共享用户名的意思是不能有重名用户。 假定同一个集群里有两个数据库和一个joe用户，系统可以配置成只允许joe 访问其中的一个数据库。
-- 一个数据库包含一个或多个已命名的模式，模式又包含表。模式还可以包含其它对象， 包括数据类型、函数、操作符等。同一个对象名可以在不同的模式里使用而不会导致冲突； 比如，schema1和myschema都可以包含一个名为mytable的表。 和数据库不同，模式不是严格分离的：只要有权限，一个用户可以访问他所连接的数据库中的任意模式中的对象。

-- 我们需要模式的原因有好多：

-- 	允许多个用户使用一个数据库而不会干扰其它用户。
-- 	把数据库对象组织成逻辑组，让它们更便于管理。
-- 	第三方的应用可以放在不同的模式中，这样它们就不会和其它对象的名字冲突。

-- 模式类似于操作系统层次的目录，只不过模式不能嵌套。
5.7.1. 创建模式
CREATE SCHEMA myschema
-- 要创建或者访问在模式中的对象，写出一个受修饰的名字，这个名字包含模式名以及表名， 它们之间用一个句点分开：
schema.table

5.7.2. Public 模式
CREATE TABLE products ( ... );
5.7.3. 模式搜索路径
5.7.4. 模式和权限
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
5.7.5. 系统表模式
5.7.6. 使用方式
5.7.7. 移植性
5.8. 继承
5.9. 分区
5.9.1. 概述
-- 分区的意思是把逻辑上的一个大表分割成物理上的几块。分区可以提供若干好处：

-- 某些类型的查询性能可以得到极大提升。 特别是表中访问率较高的行位于一个单独分区或少数几个分区上的情况下。 分区可以减少索引体积从而可以将高使用率部分的索引存放在内存中。 如果索引不能全部放在内存中，那么在索引上的读和写都会产生更多的磁盘访问。

-- 当查询或更新一个分区的大部分记录时， 连续扫描那个分区而不是使用索引离散的访问整个表可以获得巨大的性能提升。

-- 如果需要大量加载或者删除的记录位于单独的分区上， 那么可以通过直接读取或删除那个分区以获得巨大的性能提升， 因为ALTER TABLE NO INHERIT和DROP TABLE 比操作大量的数据要快的多。这些命令同时还可以避免由于大量DELETE 导致的VACUUM超载。

-- 很少用的数据可以移动到便宜一些的慢速存储介质上。

-- 这种好处通常只有在表可能会变得非常大的情况下才有价值。 到底多大的表会从分区中收益取决于具体的应用， 不过有个基本的拇指规则就是表的大小超过了数据库服务器的物理内存大小。

-- 目前，PostgreSQL支持通过表继承进行分区。 每个分区必须做为单独一个父表的子表进行创建。父表自身通常是空的， 它的存在只是为了代表整个数据集。你在试图实现分区之前，应该先熟悉继承(参阅第 5.8 节)。

-- PostgreSQL可以实现下面形式的分区：

-- 范围分区
-- 表被一个或者多个关键字段分区成"范围"，这些范围在不同的分区里没有重叠。 比如，我们可以通过时间范围分区，或者根据特定业务对象的标识符范围分区。

-- 列表分区
-- 表通过明确地列出每个分区里应该出现哪些关键字值实现。
5.9.2. 实现分区
5.9.3. 管理分区
5.9.4. 分区和约束排除
5.9.5. 替代分区方法
5.9.6. 警告
5.10. 外部数据
5.11. 其它数据库对象
5.12. 依赖性跟踪
-- 如果你创建了一个包含许多表，并且带有外键约束、视图、触发器、函数等复杂的数据库结构。 那么你就会在对象之间隐含地创建了一个依赖性的网络。比如，一个带有外键约束的表依赖于它所引用的表。


6. 数据操作
6.1. 插入数据
-- 在创建完一个表的时候，它里面没有数据。 在数据库可以有点用处之前要做的第一件事就是向里面插入数据。 数据在概念上是每次插入一行。我们当然可以每次插入多行， 但是确实没有办法插入少于一行的数据。即使你只知道几个字段的数值， 那么你也必须创建一个完整的行。
-- 使用INSERT命令创建一个新行。 这条命令要求提供表名字以及字段值。比如， 考虑来自第 5 章的产品表：
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric
);
-- 下面是一个向表中插入一行的例子：

INSERT INTO products VALUES (1, 'Cheese', 9.99);


6.2. 更新数据
-- 修改已经存储在数据库中的数据的行为叫做更新。你可以更新单独的一行， 也可以更新表中所有的行，还可以更新其中的一部分行。我们可以独立地更新每个字段， 而其它的字段则不受影响。
UPDATE products SEt price = 10 WHERE price = 5;

6.3. 删除数据
-- 到目前为止我们已经解释了如何向表中增加数据以及如何改变数据。 剩下的是讨论如何删除不再需要的数据。和前面增加数据一样， 删除数据也必须是从表中整行整行地删除。 在上一节里我们提到了 SQL 没有提供直接指定某一行的方法。因此， 删除行只能是通过声明被删除行必须匹配的条件进行。如果你在表上有一个主键， 那么你可以声明准确的行。当然，你也可以删除匹配条件的一组行， 或者一次删除表中的所有行。
-- 我们使用DELETE命令删除行。它的语法和UPDATE 命令非常类似。比如，要从产品表中删除所有价格为 10 的产品，用：
DELETE FROM products WHERE price = 10;
-- 如果你只是写：
DELETE FROM products;
-- 那么表中所有行都会被删除！程序员一定要注意。















