class AddSuccessListToHero < ActiveRecord::Migration
  def change
    add_column :heros, :successful_list, :text
  end
end
