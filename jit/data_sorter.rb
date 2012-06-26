require 'json'
require 'csv'

class DataSorter

  Task = Struct.new(:id, :start_date, :end_date, :time_spent_in_days)

  class Product < Struct.new(:id, :name, :description, :color, :task_color, :tasks)
    def initialize(*args)
      super
      self.tasks ||= []
    end
  end

  # [ :id,  :name, :description, :color, :task_color, :tasks) ]
  PRODUCT_PROPERTIES = [
    [ "A", "Product A", "A comment Project A", "#3366FF","#3366FF", "#00B8F5" ],
    [ "C", "Product C", "A comment about Product C", "#F5003D", "#FF0033" ],
    [ "F", "Product F", "A comment about Product F", "#F5003D", "#88C200" ],
    [ "S", "Product S", "A comment about Product S", "#FFCC00", "#FFDE00" ]
  ]

  def initialize(csv_path)
    @csv_path = csv_path
  end

  def products_with_tasks_from_csv
    empty_products = PRODUCT_PROPERTIES.map { |a| Product.new(*a) }
    empty_products.tap { |products|
    
     CSV.table(@csv_path).each do |row|
        next if row.to_hash.values.none?
        
        product = products.find { |p| p.id == row[:feature_id][/./] } or next
        task = Task.new(row[:feature_id], row[:development_started], row[:in_production])
                
            unless task.start_date.nil? || task.end_date.nil? 
                task.time_spent_in_days = task.end_date.to_i - task.start_date.to_i 
                product.tasks << task
            end
        end
        }
  end

  def data_structure
    products = products_with_tasks_from_csv
    {
      "id" => "Parent",
      "name" => "All Products",
      "data" => { "$type" => "none" },
      "children" => products.map { |product| {
        "id" => product.id,
        "name" => product.id,
        "data" => {
          "$angularWidth" => 0,
          "description" => product.description,
          "$color" => product.color,
        },
        "children" => product.tasks.map { |task| {
          "id" => task.id,
          "name" => task.id,
          "data" => {
            "$angularWidth" => task.time_spent_in_days,
            "startDate" => task.start_date,
            "endDate" => task.end_date,
            "timeTaken" => task.time_spent_in_days,
            "$color" => product.task_color
          },
          "children" => []
        }}
      }}
    }
  end
end

data_sorter =  DataSorter.new("../data/alldata.csv")
data_structure = data_sorter.data_structure
File.open("time_by_project1.js", "w") do |io|
  io << "var json =" << JSON.dump(data_structure)
end
