class CreateListQuakes < ActiveRecord::Migration
  def change
    create_table :list_quakes do |t|
      t.datetime :outbreakdatatime
      t.string :location
      t.string :joult_scale
      t.string :magnitude

      t.timestamps null: false
    end
  end
end
