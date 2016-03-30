gem-redcarpet-知识点.rb

1.0  
gem 'redcarpet'
gem 'coderay'

2.0 
# 接下来，打开app/helper/application_helper.rb， 添加下列代码。

  def markdown(text)
    options = {   
        :autolink => true, 
        :space_after_headers => true,
        :fenced_code_blocks => true,
        :no_intra_emphasis => true,
        :hard_wrap => true,
        :strikethrough =>true
      }
    markdown = Redcarpet::Markdown.new(HTMLwithCodeRay,options)
    markdown.render(h(text)).html_safe
  end

  class HTMLwithCodeRay < Redcarpet::Render::HTML
    def block_code(code, language)
      CodeRay.scan(code, language).div(:tab_width=>2)
    end
  end


################  或者  app/helper/application_helper.rb #############

  def markdown(content)
    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, space_after_headers: true, fenced_code_blocks: true)
    @markdown.render(content)
  end

3.0 
第一步是添加了一个markdown方法，配置了一些显示方面的细节，比如autolink, hard_wrap之类的。


第二步用了一个我们自己定义的HTMLwithCodeRay的Render类来创建一个新的markdown对象，
然后用这个自定义类来解析传进来的字符串。


最后就是这个自定义类，里面就重写了一个方法。当我们遇到block_code的时候，转交给CodeRay来生成
高亮。


























