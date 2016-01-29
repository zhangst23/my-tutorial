Active Record 数据验证.rb

1.0
# 下列方法会做数据验证，如果验证失败就不会把对象存入数据库：

create
create!
save
save!
update
update!

爆炸方法（例如 save!）会在验证失败后抛出异常。验证失败后，非爆炸方法不会抛出异常，save 和 update 返回 false，create 返回对象本身。



2.0

validates :name, presence: true



3.0

error[:attribute]

acceptance


validates_associated


confirmation

exclusion


format


inclusion


length


numericality


presence


absence

uniqueness

validates_with

validates_each


3  常用的验证选项

:allow_nil

:allow_blank


:message

:on



4.条件验证
指定symbol

指定字符串


指定Proc


5.
处理验证错误





