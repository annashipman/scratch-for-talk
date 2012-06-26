function projectPosition(d) {
    var projectX; 
    if (d.project == "A") { projectX = 100; }
    else if (d.project == "B") { projectX = 200; }
    else if (d.project == "C") { projectX = 300; }
    else if (d.project == "D") { projectX = 400; }
    return projectX;
  }
  
function numberOfFeatures(d) { return d.numberOfFeatures.length * 20; }

var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    
var xScale = d3.scale.ordinal().domain(["", "a", "b", "c", "d"]).range([0, width/5, 2*(width/5), 3*(width/5), 4*(width/5), width]); //this can't be the right way to do this!

var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4, d3.format(",d"));

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

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
        
