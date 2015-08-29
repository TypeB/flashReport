json.version 1
json.status 200
json.datetime DateTime.now
json.data do
	json.array! @quaks do |quak|
	  json.extract! quak, :id, :url, :location, :jolt_scale, :data_type
	  json.outbreakdatatime quak.outbreakdatatime.strftime("%Y年 %m月 %d日 %H時 %M分")
	end
end