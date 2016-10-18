class AddNodeIdToHero < ActiveRecord::Migration
  def change
    add_column :heros, :node_id, :integer
  end
end
