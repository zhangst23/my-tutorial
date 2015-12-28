python操作MySQL数据库.py

# 我采用的是MySQLdb操作的MYSQL数据库。先来一个简单的例子吧：
import MySQLdb

try:
	conn=MySQLdb.connect(host='localhost',user='root',passwd='root',db='test',port=3306)
	cur=conn.cursor()
	cur.execute('select * from user')
	cur.close()
except MySQLdb.Error,e:
	print "Mysql Error %d: %s" % (e.arts[0],e.args[1])


# 　请注意修改你的数据库，主机名，用户名，密码。

# 下面来大致演示一下插入数据，批量插入数据，更新数据的例子吧：
import MySQLdb

try:
	conn=MySQLdb.connect(host='localhost',user='root',passwd='root',port=3306)
	cur=conn.cursor()

	cur.execute('create database if not exists python')
	conn.select_db('python')
	cur.execute('create table test(id int,info varchar(20))')

	value=[1,'hi rollen']
	cur.execute('insert into test values(%s,%s)',value)

	values=[]
	for i in range(20):
		values.append((i,'hi rollen'+str(i)))

	cur.executemany('insert into test values(%s,%s)',values)

	cur.execute('updata test set info="I am rollen" where id=3')

	conn.commit()
	cur.close()
	conn.close()

except MySQLdb.Error,e:
	print "Mysql Error %d: %s" %(e.args[0],e.args[1])


# 　　请注意一定要有conn.commit()这句来提交事务，要不然不能真正的插入数据。































