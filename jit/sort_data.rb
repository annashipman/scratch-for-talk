#!/usr/bin/env ruby
require_relative "lib/data_sorter"

output_file = "time_by_project.js"

data_sorter =  DataSorter.new("../data/alldata.csv", date_range: Date.parse("2011-01-01")..Date.parse("2011-03-01"))
data_structure = data_sorter.data_structure
File.open(output_file, "w") do |io|
  io << "var json =" << JSON.dump(data_structure)
end

puts "Wrote sorted data to #{output_file}"
