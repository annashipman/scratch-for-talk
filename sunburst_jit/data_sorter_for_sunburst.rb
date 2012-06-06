require 'json'
require 'date'

class DataSorter

  def initialize
    @no_dates = []
    @records_with_dates = []
  end

  def read_and_split_into_arrays
    file = File.open("alldata.csv", "r")
    @headers = file.gets.chomp.split(',')

    file.each_line do |row|
 
      record = row.chomp.split(',') 
        if record.empty? 
            #a blank row - do nothing. How to do better?
        else    
          start_date = record[7].tr_s('"', '').strip
          end_date = record[12].tr_s('"', '').strip
            if start_date.eql?"NULL" or start_date.empty? or end_date.eql?"NULL" or end_date.empty?
                @no_dates << record           
            else                
                start_date_as_date = Date.parse(start_date)
                start_date_is_later = start_date_as_date <=> Date.new(2012,3,3)

                if start_date_is_later == 1
                    start_date_as_date = Date.parse(start_date)
                    end_date_as_date = Date.parse(end_date)
                    #ideally this would be week days, but not hugely important for this visualisation      
                    time_spent_in_days = (end_date_as_date - start_date_as_date).to_i          
                    project = record[1].tr_s('"', '').strip
                    feature = { "id" => record[0].tr_s('"', '').strip,
                                "name" => record[0].tr_s('"', '').strip, 
                                "data" => {"project" => project,
                                           "$angularWidth" => time_spent_in_days,
                                           "startDate" => start_date,
                                           "endDate" => end_date,
                                           "timeTaken" => time_spent_in_days,                                       
                                           "$color" => "",   #make this dependent on project
                                            },
                                "children" => []
                             }
                    @records_with_dates << feature
                end
            end      
        end
    end
  end
  
  def split_features_by_project
    a = {"id" => "A",  
         "name" => "Project A",  
         "data" => {  
            "description" => "Some details about Project A",  
            "$color" => "#3366FF",   
            },  
        "children" => []  
        }  
    c = {"id" => "C",  
         "name" => "Project C",  
         "data" => {  
            "description" => "Project C was the first project called C",  
            "$color" => "#F5003D",   
            },  
        "children" => []  
        }  
    f = {"id" => "F",  
         "name" => "Project F",  
         "data" => {  
            "description" => "Project F, blah blah blah",  
            "$color" => "#27C200",   
            },  
        "children" => []  
        }  
    s = {"id" => "S",  
         "name" => "Project S",  
         "data" => {  
            "description" => "Some great stuff about Project S",  
            "$color" => "#9E3DFF",   
            },  
        "children" => []  
        }  

    @records_with_dates.each do |feature|
       data = feature["data"] 
       project = data["project"] 
      if "Project A".eql?project 
        children = a["children"]
        feature["data"]["$color"]="#00B8F5"
        children << feature        
     elsif "Project C".eql?project
        children = c["children"]
        feature["data"]["$color"]="#FF0033"
        children << feature        
     elsif "Project F".eql?project
        children = f["children"]
        feature["data"]["$color"]="#88C200"        
        children << feature        
     elsif "Project S".eql?project
        children = s["children"]
        feature["data"]["$color"]="#BD7AFF"
        children << feature        
      else
        puts "no project or #{feature.project}" 
      end
    end
    
    parent = {"id" => "Parent",  
         "name" => "All Projects",  
         "data" => {  
            "$type" => "none"
            },  
        "children" => [a, c, f, s]  
        }

    File.open('time_by_project.js', 'w') do |file|
        file.puts "var json ="  
        file.puts JSON.dump(parent)  
    end
    puts "OK"
 end
end
   
sorter = DataSorter.new
sorter.read_and_split_into_arrays
sorter.split_features_by_project
