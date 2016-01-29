1.1.1使用主键
client = Client.find(10)
#=
SELECT * FROM clients WHERE (clients.id = 10) LIMIT 1

1.1.2 take
client = Client.take
#=
SELECT * FROM clients LIMIT 1

1.1.3 first
client = Client.first
#= 
SELECT * FROM clients ORDER BY clients.id ASC LIMIT 1

1.1.4 last
client = Client.last

SELECT * FROM clients ORDER BY clients.id DESC LIMIT 1

1.1.5 find_by
Client.find_by first_name: 'Lifo'

Client.find_by first_name: 'Jon'

等价于
Client.where(first_name: 'Lifo').take


1.2   获取多个对象 
1.2.1  使用多个主键
client = Client.find([1,10])

1.2.2  take
Client.take(2)

1.2.3  first
Client.first(2)


1.2.3  last
Client.last(2)


1.3  批量获取多个对象
User.all.each do |user|
  NewsLetter.weekly_deliver(user)
end



1.3.1  find_each  获取一批记录，然后分别把每个记录传入代码块。
User.find.each do |user|
  NewsLetter.weekly_deliver(user)
end


User.find.each(batch_size: 5000) do |user|
  NewsLetter.weekly_deliver(user)
end


User.find.each(start: 2000, batch_size: 5000) do |user|
  NewsLetter.weekly_deliver(user)
end


1.3.2  find_in_batches  把整批记录作为一个数组传入代码块，而不是单独传入各记录
Invoice.find_in_batches(include: :invoice_lines) do |invoices|
  export.add_invoices(invoices)
end


2 条件查询
2.1 纯字符串条件

Client.where("orders_count = '2'")

2.2 数组条件

Client.where("orders_count = ?", params[:orders])

Client.where("orders_count = ? AND locked = ?", params[:orders], false)

Client.where("orders_count = ?", params[:orders])

Client.where("orders_count = #{params[:orders]}")


2.2.1 条件中的占位符

Client.where("created_at >= :start_date AND created_at <= :end_date",
	{start_date: params[:start_date], end_date: params[:end_date]})


2.3 Hash 条件
2.3.1 相等
Client.where(locked: true)










