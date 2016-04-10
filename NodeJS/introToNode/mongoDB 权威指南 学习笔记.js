mongoDB 权威指南.js




3.3.1 文档替换
{
	"_id" : ObjectId("2455554444"),
	"name" : "joe",
	"friends" : 32,
	"enemies" : 2
}

// 想变成下面的样子
{
	"_id" : ObjectId("245555555"),
	"username" : "joe",
	"relationships" : 
		{
			"friends" : 32,
			"enemies" : 2
		}
}

// 可以用 update 来替换文档
> var joe = db.users.findOne({"name" : "joe"});
> joe.relationships = {"friends" : joe.friends,"enemies" : joe.enemies};
{
	"friends" : 32,
	"enemies" : 2
}

> joe.username = joe.name;
"joe"
> delete joe.friends;
true
> delete joe.enemies;
true
> delete joe.name;
true
> db.users.update({"name" : "joe"}, joe);
> findOne































