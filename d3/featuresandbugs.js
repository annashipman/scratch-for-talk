var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.ordinal().domain(["", "a", "b", "c", "d"]).range([0, width/5, 2*(width/5), 3*(width/5), 4*(width/5), width]),
    yScale = d3.scale.linear().domain([0, 40]).range([height, 0]),
    radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
    colorScale = d3.scale.category10();

var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4, d3.format(",d")),
    yAxis = d3.svg.axis().scale(yScale).orient("left");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("projects");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("number of completed features");

var month = 0;

var features = svg.append("g")
    .selectAll("rect")
    .data(months[month]) 
    .enter()
    .append("rect")
    .style("fill", "green" )
    .attr("width", 60)        
    .attr("x", function(d) { return projectPosition(d) } )
    
    .attr("y", function(d) { return height - numberOfFeatures(d) } )
    .attr("height", function(d) { return numberOfFeatures(d) });

function projectPosition(d) {
    var projectX; 
    if (d.project == "A") { projectX = 100; }
    else if (d.project == "B") { projectX = 200; }
    else if (d.project == "C") { projectX = 300; }
    else if (d.project == "D") { projectX = 400; }
    return projectX;
  }
  
function numberOfFeatures(d) { return d.numberOfFeatures.length * 20; }

function redraw() {
   
        svg.selectAll("rect") 
        .data(months[month])
        .transition()
        .duration(1000)
        .attr("y", function(d) { return height - numberOfFeatures(d) } )
        .attr("height", function(d) { return numberOfFeatures(d) });
    }

setInterval(function() {
  if (month < months.length - 1) {
    month++;
    redraw();
  }
}, 1500);  

