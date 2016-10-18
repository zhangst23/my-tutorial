class AddImageToHero < ActiveRecord::Migration
  def change
    add_column :heros, :image, :string
  end
end
