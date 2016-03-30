gem-kaminari 知识点.rb

1.0
  def index
    @lists = List.all.order(created_at: :desc).page(params[:page]).per(5)
  end


2.0
en:
  hello: "Hello world"
  views:
    pagination:
      first: "首页"
      last: "末页"
      previous: "上一页"
      next: "下一页"
      truncate: "..."




3.0

    <%= paginate @lists %>










