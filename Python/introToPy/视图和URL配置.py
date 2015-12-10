# 视图和URL配置.py
1.0   
# 视图  views.py文件：

from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello world")

# 首先我们从django.http模块导入(import) HttpResponse 类。
# 然后，我们定义一个叫做 hello 的视图函数。
# 每个视图函数至少要有一个参数，通常叫做request。这是一个触发这个视图、包含当前web请求信息的对象，是类django.http.HttpResponse的一个实例
# 这个函数只有简单的一行代码：他仅仅返回一个HttpResponse对象，这个对象包含了文本“Hello world”
# 一个视图就是Python的一个函数，这个函数第一个参数的类型是HttpRequest；它返回一个HttpRequest实例。为了使一个Python的函数
# 成为一个Django可识别的视图，他必须满足这两个条件。

2.0   
# urls.py  就像是Django所支撑网站的目录
from django.conf.urls.defaults import *

urlpatterns = patterns('',
)
# 让我们逐行解释一下代码：

# 第一行导入django.conf.urls.defaults下的所有模块，它们是Django URLconf的基本构造。 这包含了一个patterns函数。

# 第二行调用 patterns() 函数并将返回结果保存到 urlpatterns 变量。patterns函数当前只有一个参数—一个空的字符串。 （这个字符串可以被用来表示一个视图函数的通用前缀。具体我们将在第八章里面介绍。）

from django.conf.urls.defaults import *
from mysite.views import hello

urlpatterns = patterns('',
    ('^hello/$', hello),
)
# 请留意：为了简洁，我们移除了注释代码。 如果你喜欢的话，你可以保留那些行。）
# 我们做了两处修改。
# 首先，我们从模块 (在 Python 的 import 语法中， mysite/views.py 转译为 mysite.views ) 中引入了 hello 视图。 （这假设mysite/views.py在你的Python搜索路径上。关于搜索路径的解释，请参照下文。）
# 接下来，我们为urlpatterns加上一行： (‘^hello/$’, hello), 这行被称作URLpattern，它是一个Python的元组。元组中第一个元素是模式匹配字符串（正则表达式）；第二个元素是那个模式将使用的视图函数。

# URLpattern的语法
#  虽然我们想匹配地址/hello/，但是模式看上去与这有点差别。 这就是为什么：
# Django在检查URL模式前，移除每一个申请的URL开头的斜杠(/)。 这意味着我们为/hello/写URL模式不用包含斜杠(/)。（刚开始，这样可能看起来不直观，但这样的要求简化了许多工作，如URL模式内嵌，我们将在第八章谈及。）
# 模式包含了一个尖号(^)和一个美元符号($)。这些都是正则表达式符号，并且有特定的含义： 上箭头要求表达式对字符串的头部进行匹配，美元符号则要求表达式对字符串的尾部进行匹配。
# 最好还是用范例来说明一下这个概念。 如果我们用尾部不是$的模式’^hello/’，那么任何以/hello/开头的URL将会匹配，例如：/hello/foo 和/hello/bar，而不仅仅是/hello/。类似地，如果我们忽略了尖号(^)，即’hello/$’，那么任何以hello/结尾的URL将会匹配，例如：/foo/bar/hello/。如果我们简单使用hello/，即没有^开头和$结尾，那么任何包含hello/的URL将会匹配，如：/foo/hello/bar。因此，我们使用这两个符号以确保只有/hello/匹配，不多也不少。
# 你大多数的URL模式会以^开始、以$结束，但是拥有复杂匹配的灵活性会更好。
# 你可能会问：如果有人申请访问/hello（尾部没有斜杠/）会怎样。 因为我们的URL模式要求尾部有一个斜杠(/)，那个申请URL将不匹配。 然而，默认地，任何不匹配或尾部没有斜杠(/)的申请URL，将被重定向至尾部包含斜杠的相同字眼的URL。 （这是受配置文件setting中APPEND_SLASH项控制的，参见附件D。）
# 如果你是喜欢所有URL都以’/’结尾的人（Django开发者的偏爱），那么你只需要在每个URL后添加斜杠，并且设置”APPEND_SLASH”为”True”. 如果不喜欢URL以斜杠结尾或者根据每个URL来决定，那么需要设置”APPEND_SLASH”为”False”,并且根据你自己的意愿来添加结尾斜杠/在URL模式后.

3.0   
# 第二个视图： 动态内容



4.0

# 视图负责处理一些主观逻辑，然后返回响应结果

































