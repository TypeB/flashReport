require 'net/http'
require 'uri'
require 'json'
require 'time'

class EarthquakeInformationsController < ApplicationController
	def index
		#self.api_type_zish
		quaks = self.api_type_p2pquake
		puts quaks
		#self.api_type_p2pquake
		for c in quaks do
			if (!ListQuake.exists?(:outbreakdatatime=>c[:outbreakdatatime],:location=>c[:location]))
				list_quak = ListQuake.new({outbreakdatatime:c[:outbreakdatatime] ,location:c[:location],joult_scale:c[:joult_scale],magnitude:c[:magnitude]})
				list_quak.save
			end
		end

		
		# list_quak.save
		render :text => "test", :status => 200
	end
	def api_type_zish
		#http://zish.in/api/quake.json
		uri = URI.parse('http://zish.in/api/quake.json')

		https = Net::HTTP.new(uri.host, uri.port)
		https.use_ssl = false
		res = https.start {
		  https.get(uri.request_uri)
		}

		if res.code == '200'
		  result = JSON.parse(res.body)
		  puts "---------------------------"
		  puts result["Place"]
		  puts result["MaxIntensity"]
		  puts result["Magnitude"]
		  puts result["QuakeDateTime"]
		else
		  puts "OMG!! #{res.code} #{res.message}"
		end
		##render :text => result[0], :status => 200
		
	end

	def api_type_epsp2json
		#http://www49.atpages.jp/epsp2json/
		#http://hachibucch.hatenablog.com/
		list = []
		uri = URI.parse('http://www49.atpages.jp/epsp2json/')

		https = Net::HTTP.new(uri.host, uri.port)
		https.use_ssl = false
		res = https.start {
		  https.get(uri.request_uri)
		}

		if res.code == '200'
		  result = JSON.parse(res.body)
		  data = result["data"]
		  for i in data do
		  	#puts i["category"]
		  	if (i["category"] == "震源・詳細震度情報" )
				list.push({:location => i["center"] , :joult_scale => i["intensity"] , :magnitude => i["magnitude"] , :outbreakdatatime => i["time"]})

		  	end

		  end
		  list
		else
		  puts "OMG!! #{res.code} #{res.message}"
		end
	end
	def api_type_p2pquake
		#http://api.p2pquake.com/v1/human-readable
		#http://www.p2pquake.com/dev/?q=json-api
		list = []
		uri = URI.parse('http://api.p2pquake.com/v1/human-readable')

		https = Net::HTTP.new(uri.host, uri.port)
		https.use_ssl = false
		res = https.start {
		  https.get(uri.request_uri)
		}

		if res.code == '200'
		  result = JSON.parse(res.body)
		  #p result[0]
		  for i in result do
		  	if (i["code"] == 551 )
		  		if(i["issue"]["type"] == "DetailScale")


					list.push({:location =>i["earthquake"]["hypocenter"]["name"], :joult_scale => convert_max_scale(i["earthquake"]["maxScale"]) , :magnitude => i["earthquake"]["hypocenter"]["magnitude"], :outbreakdatatime => Time.strptime(i["earthquake"]["time"] , "%d日%H時%M分") })

			  	end

		  	end

		  end
		  list
		else
		  puts "OMG!! #{res.code} #{res.message}"
		end
		#render :text => result[0], :status => 200
	end



	private
		def convert_max_scale(scale)
			case scale
			when 0 then
				"0"
			when 10 then
				"1"
			when 20 then
				"2"
			when 30 then
				"3"
			when 40 then
				"4"
			when 45 then
				"5弱"
			when 50 then
				"5強"
			when 55 then
				"6弱"
			when 60 then
				"6強"
			when  70 then
				"7"
			else
				"不明"
			end
		end
end
