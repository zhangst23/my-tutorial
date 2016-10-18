class AddArticleListToHero < ActiveRecord::Migration
  def change
    add_column :heros, :article_list, :text
  end
end
