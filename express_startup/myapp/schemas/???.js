// 连接数据库

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// 定义 schema

var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


// 创建 model 模型

var Blog = mongoose.model('Blog', blogSchema);
