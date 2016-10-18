class AddHerosCountToNodes < ActiveRecord::Migration
  def change
    add_column :nodes, :heros_count, :integer
  end
end
