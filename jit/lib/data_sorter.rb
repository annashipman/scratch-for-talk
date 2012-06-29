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

  class Project < Struct.new(:id, :name, :description, :color, :task_color, :tasks)
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

  def empty_projects
    [
      #           id   name         description                  color      task color
      Project.new("A", "Project A", "A comment Project A",       "#6A8CE0", "#7CB2E0"),
      Project.new("C", "Project C", "A comment about Project C", "#E4A12D", "#F2D433"),
      Project.new("F", "Project F", "A comment about Project F", "#D96920", "#A5350E"),
      Project.new("S", "Project S", "A comment about Project S", "#3E56A1", "#36305D")
    ]
  end

  def products_with_tasks_from_csv
    products = empty_projects

    #Read in the CSV row by row 
    CSV.table(@csv_path).each do |row|
      
      #ignore blank rows
      next if row.to_hash.values.none?
      
      #find the 
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
        "$angularWidth" => task.time_spent_in_days,
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
        "$angularWidth" => 0,
        "description" => product.description,
        "$color" => product.color,
      },
      "children" => product.tasks.map { |task| task_data_structure(product, task) }
    }
  end

  def data_structure
    products = products_with_tasks_from_csv
    {
      "id" => "Parent",
      "name" => "All Projects",
      "data" => { "$type" => "none" },
      "children" => products.map { |product| product_data_structure(product) }
    }
  end
end
