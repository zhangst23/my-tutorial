Flask扩展.py


# Flask 扩展以各种方式扩展了 Flask 的功能，比如增强对数据库的支持等等。

# 查找扩展
# Flask 扩展都列在 Flask 扩展注册 中，并且可以使用 easy_install 或 pip 下载。如果你把一个扩展作为依赖添加到你的 requirements.rst 或 setup.py 文件，那么它们可以使用一个简单的命令安装或随着应用一起安装。

# 使用扩展
# 扩展一般都有说明如何使用的文档，这些文档应该和扩展一起发行。扩展如何运行没有 统一的要求，但是一般在常见位置导入扩展。假设一个扩展称为 Flask-Foo 或 Foo-Flask ，那么总是可以导入 flask.ext.foo:

from flask.ext import foo








