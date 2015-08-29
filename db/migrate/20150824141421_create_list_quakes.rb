class CreateListQuakes < ActiveRecord::Migration
  def change
    create_table :list_quakes do |t|
      t.datetime :outbreakdatatime
      t.string :location
      t.string :jolt_scale
      t.integer :jolt_scale_number
      t.string :magnitude
      t.string :url 
      t.timestamps null: false
    end
  end
end
