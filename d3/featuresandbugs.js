var margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = 600 - margin.right,
    height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.ordinal().domain(["A", "B", "C", "D"])
			.rangeBands([100, width]),
    yScale = d3.scale.linear().domain([0, 40]).range([height, 0]),
    colorScale = d3.scale.category10();

var svg = d3.select("#chart").append("svg") 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
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
    .selectAll(".feature")
    .data(months[month]) 
    .enter()
    .append("rect")
    .style("fill", function(d, i) { return colorScale(i)} )
    .attr("width", 60)        
    .attr("x", function(d) { return xScale(d.project) } )
    .attr("class", "feature")

    .attr("y", function(d) { return height - numberOfFeatures(d) } )
    .attr("height", function(d) { return numberOfFeatures(d)});

function numberOfFeatures(d) { return d.numberOfFeatures.length * 20; }

function redraw() {
   
        svg.selectAll(".feature") 
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

