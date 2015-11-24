// gulp学习.js

// 1.1
// 安装Node
node -v
npm -v

// 2.1
// 安装gulp
sudo npm install -g gulp 


// sudo是以管理员身份执行命令，一般会要求输入电脑密码
// npm是安装node模块的工具，执行install命令
// -g表示在全局环境安装，以便任何项目都能使用它
// 最后，gulp是将要安装的node模块的名字

gulp -v




// 3.1
// 进入到项目

// cd，定位到目录
// ls，列出文件列表

cd /Applications/XAMPP/xamppfiles/htdocs/my-project


// 接下来，再次在本地安装gulp
// 这样做的目的是为了让gulp开发升级更加灵活，具体的我也不太懂，stackoverflow上面有人问过这个问题“为什么我要在全局和本地安装两次我的gulp”

npm install --save-dev gulp

// 这里，我们使用 —-save-dev来更新package.json文件，更新devDependencies值，以表明项目需要依赖gulp。

// 3.2.再次在本地安装gulp：npm install gulp --save
// 3.2.新建package.json配置文件：npm init
// 3.2.会出来一个命令行对话输入
// 	依次填写即可得到你的package.json文件，ls一下可以查看。
// 3.2.接下来假设gulp-flie 项目开发中还有css，js等文件，我们可以通过配置gulpfile.js文件来进行管理



// 4.1
// 新建Gulpfile文件，运行gulp


// 安装好gulp后我们需要告诉它要为我们执行哪些任务，首先，我们自己需要弄清楚项目需要哪些任务。

// 检查Javascript
// 编译Sass（或Less之类的）文件
// 合并Javascript
// 压缩并重命名合并后的Javascript


// 安装依赖

npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev 
// 提醒下，如果以上命令提示权限错误，需要添加sudo再次尝试。




// 新建gulpfile文件

// 现在，组件都安装完毕，我们需要新建gulpfile文件以指定gulp需要为我们完成什么任务。

// gulp只有五个方法： task，run，watch，src，和dest，在项目根目录新建一个js文件并命名为gulpfile.js，把下面的代码粘贴进去：
// task这个API用来创建任务，在命令行下可以输入 gulp test 来执行test的任务。
// watch这个API用来监听任务。
// src这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss。
// dest这个API设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本。


// 4.2代码片段
// gulpfile.js

//4.2.1引入 gulp
var gulp = require('gulp');

//4.2.2引入组件
// 这一步，我们引入了核心的gulp和其他依赖组件，接下来，分开创建lint, sass, scripts 和 default这四个不同的任务。
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

//4.2.3检查脚本
// Link任务会检查js/目录下得js文件有没有报错或警告。
gulp.task('lint',function(){
	gulp.src('./js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

//4.2.4编译sass
// Sass任务会编译scss/目录下的scss文件，并把编译完成的css文件保存到/css目录中。
gulp.task('sass',function(){
	gulp.src('./scss/*.scss')     //编译sass
		.pipe(sass())
		.pipe(gulp.dest('./css'));   //保存未压缩文件到我们指定的目录下面

 
  // 		//给文件添加.min后缀
  //       .pipe(rename({ suffix: '.min' }))
  //       //压缩样式文件
  //       .pipe(minifycss())
  //       //输出压缩文件到指定目录
  //       .pipe(gulp.dest('assets'))
  //       //提醒任务完成
  //       .pipe(notify({ message: 'Styles task complete' }));


});

// 4.2.5合并，压缩文件
// scripts任务会合并js/目录下得所有得js文件并输出到dist/目录，然后gulp会重命名、压缩合并的文件，也输出到dist/目录。
gulp.task('scripts',function(){
	gulp.src('./js/*.js')               //js代码校验
		.pipe(concat('all.js'))         //js代码合并
		.pipe(gulp.dest(./dist))
		.pipe(rename('all.min.js'))     //给文件添加.min后缀
		.pipe(uglify())                 //压缩脚本文件
		.pipe(gulp.dest('./dist'));     //输出压缩文件到指定目录


		//提醒任务完成
        .pipe(notify({ message: 'Scripts task complete' }));
});


// 4.2.6 图片压缩
// Images
gulp.task('images', function() {
  return gulp.src('images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('images'))
    .pipe(notify({ message: 'Images task complete' }));
});




//4.2.7默认任务
// 这时，我们创建了一个基于其他任务的default任务。使用.run()方法关联和运行我们上面定义的任务，使用.watch()方法去监听指定目录的文件变化，当有文件变化时，会运行回调定义的其他任务。
gulp.task('default',function(){
	gulp.run('lint','sass','scripts');

	//监听文件变化
	gulp.watch('./js/*.js',function(){
		gulp.run('lint','sass','scripts');
	});
})


// 现在，回到命令行，可以直接运行gulp任务了

gulp
// 这将执行定义的default任务，换言之，这和以下的命令式同一个意思
// gulp default

// 当然，我们可以运行在gulpfile.js中定义的任意任务，比如，现在运行sass任务：
// gulp sass




// 5.1生成CSS雪碧图

// 先介绍下CSS雪碧图，其实做过前端的人都知道雪碧图，只是不知道还有这么个高大上的名字而已。CSS雪碧图，也就是CSS Sprite，说白了就是将小图标和背景图像合并到一张图片上，然后利用css的背景定位来显示需要显示的图片部分。在没有使用自动化工具之前，如果需要完成这个定位技术，需要用PS等其他工具，去查看每个图片的大小，然后再写出CSS代码进行定位。如果大小刚好设置得对了，那么完事ok，如果大小差了1、2像素，就需要再手动的调整下CSS代码，如此反复调整~。 
// 现在有了自动化工具，情况就不一样了，只需要动动手指头，让电脑自己工作就行了~ 
// 下载插件什么的就不用强调，这里我使用的是gulp.spritesmith，其实如果从npm上搜索spritesmith话，能搜到不同版本的spritesmith。


var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
 
gulp.task('sprite', function () {
  return gulp.src('src/images/background/*.png')    // 目录下共有三张图片
      .pipe(spritesmith({
        imgName: 'sprite.png',    // 生成雪碧图的名字
        cssName: 'sprite.css'     // 生成雪碧图的css文件
    }))
    .pipe(gulp.dest('dist/images/background'));
});
gulp.task('default', ['sprite']);


// 生成的css文件如下：


// Icon classes can be used entirely standalone. They are named after their original file names.
// <!-- `display: block` sprite -->
<div class="icon-home"></div>

// <!-- `display: inline-block` sprite -->
<img class="icon-home" />
//
.icon-fork {
  background-image: url(sprite.png);
  background-position: 0px 0px;
  width: 32px;
  height: 32px;
}
.icon-github {
  background-image: url(sprite.png);
  background-position: -32px 0px;
  width: 32px;
  height: 32px;
}
.icon-twitter {
  background-image: url(sprite.png);
  background-position: 0px -32px;
  width: 32px;
  height: 32px;
}
// 现在，不光图片合并了，连css样式都直接生成了，么么哒~





// gulp 技巧集
http://www.gulpjs.com.cn/docs/recipes/




















