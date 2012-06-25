require 'json'
require 'csv'

class DataSorter

  Task = Struct.new(:id, :start_date, :end_date, :time_spent_in_days)

  class Product < Struct.new(:id, :name, :description, :color, :task_color, :tasks)
    def initialize(*args)
      super
      self.products ||= []
    end
  end

  # [ :id,  :name,, :description, :color, :task_color, :tasks) ]
  PRODUCT_PROPERTIES = [
    [ "A", "Product A", "A comment Project A", "#F5003D", "#00B8F5" ],
    [ "C", "Product C", "A comment about Product C", "#3366FF", "#FF0033" ],
    [ "F", "Product F", "A comment about Product F", "#F5003D", "#88C200" ],
    [ "S", "Product S", "A comment about Product S", "#27C200", "#FFFF3D" ]
  ]

  def initialize(csv_path)
    @csv_path = csv_path
  end

  def products_with_tasks_from_csv
    empty_products = PRODUCT_PROPERTIES.map { |a| Product.new(*a) }
    empty_products.tap { |products|
      CSV.table(@csv_path).each do |row|
        product = products.find { |p| p.id == row[:product] }
        product.tasks << Task.new(row[:task], row[:start_date], row[:end_date], row[:time_spent_in_days])
      end
    }
  end

  def data_structure
    products = products_with_tasks_from_csv
    {
      "id" => "Parent",
      "name" => "All Products",
      "data" => { "$type" => "none" },
      "children" => tasks.map { |product| {
        "id" => task.id,
        "name" => task.id,
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

data_structure =  DataSorter.new("../data/alldatahacked.csv").data_structure
File.open("json.js", "w") do |io|
  io << "var json =" << JSON.dump(data_structure)
end
