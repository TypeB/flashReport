json.version 1
json.status 200
json.datetime DateTime.now
json.data do
	json.array! quak_mocks do |quak|
	  json.extract! quak, :id, :url, :location, :jolt_scale, :data_type ,:outbreakdatatime
	end
end
