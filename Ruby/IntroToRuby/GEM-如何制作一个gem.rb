GEM-如何制作一个gem.rb

1.0  步骤
1.1
bundle gem a
cd a

1.2 修改 gemspec 描述文件
gem.description
gem.summary

1.3 增加 依赖声明
# 在 a.gemspec 的后面增加
gem.add_dependency "nokogiri", ">=2.0.0"

1.4
提交到 Git, 生成 gem
git add .
git commit -m"first commit"
gem build a.gemspec

1.5 上传至 Rubygems.org, 供更多人使用
gem push a-0.0.1.gem
# 如不哦没有账号，请到 Rubygems.org 上注册一个




















