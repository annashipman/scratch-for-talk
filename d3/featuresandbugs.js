var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;

var projects = ["A", "B", "C", "D"];

var colorScale = d3.scale.category10();

var xScale = d3.scale.ordinal()
      .domain(projects)
      .rangeBands([0, width]),
    yScale = d3.scale.linear()
      .domain([0, 20])
      .range([0, height]);

var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //need to do this so axes can be outside of dataset

var month = 0;

var features = svg.selectAll("rect")
    .data(months[month]).enter()
      .append("rect")
        .attr("x", function(d) { return xScale(d.project) + 40 } ) 
        .attr("width", xScale.rangeBand() - 80) //hard-coding is for gap
        .style("fill", colorScale(1) )
    
        .attr("y", function(d) { return height - yScale(d.numberOfFeatures.length); } )
        .attr("height", function(d) { return yScale(d.numberOfFeatures.length); });

function redraw() {
  svg.selectAll("rect")
    .data(months[month])
    .transition()
      .duration(1000)
    .attr("y", function(d) { return height - yScale(d.numberOfFeatures.length); } )
    .attr("height", function(d) { return yScale(d.numberOfFeatures.length); });
}

setInterval(function() {
  if (month < months.length - 1) {
    month++;
    redraw();
  }
}, 1500);  

// # Draw Axis
var axis = svg.append('g')
            .attr('class', 'axis');

// add the lables along the bottom
axis.selectAll('text')
  .data(projects).enter()
    .append('text')
      .text(function(d){ return d; })
      .attr('dx', function(d){ return xScale(d) + (xScale.rangeBand() / 2); })
      .attr('dy', height + 18)
      .attr('width', xScale.rangeBand())
      .attr('text-anchor', 'middle');

// add the lines up the side and along the bottom
axis.append('line')
  .attr('x1', 0)
  .attr('x2', width)
  .attr('y1', height)
  .attr('y2', height);
axis.append('line')
  .attr('x1', 0)
  .attr('x2', 0)
  .attr('y1', 0)
  .attr('y2', height);

axis.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height - 6)
  .text("projects");

axis.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", 6)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("number of completed features");
