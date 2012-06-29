require 'json'
require 'csv'
require 'date'

class DataSorter

  class Task < Struct.new(:id, :start_date, :end_date)
    def time_spent_in_days
      if !end_date.nil? && !start_date.nil?
        (Date.parse(end_date) - Date.parse(start_date)).to_i
      end
    end

    def valid?
      !time_spent_in_days.nil?
    end

    def in_range?(date_range)
      return true if date_range.nil?
      date_range.cover?(Date.parse(start_date)) || date_range.cover?(Date.parse(end_date)) || 
        (Date.parse(start_date)..Date.parse(end_date)).cover?(date_range.first)
    end
  end

  class Product < Struct.new(:id, :name, :description, :color, :task_color, :tasks)
    def initialize(*args)
      super
      self.tasks ||= []
    end
  end

  def initialize(csv_path, options = {})
    @csv_path = csv_path
    @options = options
    @date_range = options[:date_range]
  end

  def empty_products
    [
      #           id   name         description                  color      task color
      Product.new("A", "Project A", "A comment Project A",       "#3366FF", "#00B8F5"),
      Product.new("C", "Project C", "A comment about Product C", "#F5003D", "#FF0033"),
      Product.new("F", "Project F", "A comment about Product F", "#F5003D", "#88C200"),
      Product.new("S", "Project S", "A comment about Product S", "#FFCC00", "#FFDE00")
    ]
  end

  def products_with_tasks_from_csv
    products = empty_products
    CSV.table(@csv_path).each do |row|
      next if row.to_hash.values.none?
      
      product = products.find { |p| p.name == row[:application_name] } or next
      task = Task.new(row[:feature_id], row[:development_started], row[:in_production])
      product.tasks << task if task.valid? && task.in_range?(@date_range)
    end
    products
  end

  def task_data_structure(product, task)
    {
      "id" => task.id,
      "name" => task.id,
      "data" => {
        "$area" => task.time_spent_in_days,
        "startDate" => task.start_date,
        "endDate" => task.end_date,
        "timeTaken" => task.time_spent_in_days,
        "$color" => product.task_color
      },
      "children" => []
    }
  end

  def product_data_structure(product)
    {
      "id" => product.id,
      "name" => product.name,
      "data" => {
        "$area" => 0,
        "description" => product.description,
        "$color" => product.color,
      },
      "children" => product.tasks.map { |task| task_data_structure(product, task) }
    }
  end

  def data_structure
    products = products_with_tasks_from_csv
    {
      "id" => "root",
      "name" => "All Products",
      "data" => {  },
      "children" => products.map { |product| product_data_structure(product) }
    }
  end
end
