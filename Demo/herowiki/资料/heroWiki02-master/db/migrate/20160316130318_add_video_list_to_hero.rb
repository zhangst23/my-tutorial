class AddVideoListToHero < ActiveRecord::Migration
  def change
    add_column :heros, :video_list, :text
  end
end
