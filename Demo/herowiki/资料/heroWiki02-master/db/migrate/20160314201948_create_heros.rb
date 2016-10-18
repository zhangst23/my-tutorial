class CreateHeros < ActiveRecord::Migration
  def change
    create_table :heros do |t|
      t.string :name
      t.integer :birthday
      t.string :country
      t.string :school
      t.text :description
      t.string :constellation

      t.timestamps null: false
    end
  end
end
