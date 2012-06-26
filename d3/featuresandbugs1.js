function projectPosition(d) {
    var projectX; 
    if (d.project == "A") { projectX = 100; }
    else if (d.project == "B") { projectX = 200; }
    else if (d.project == "C") { projectX = 300; }
    else if (d.project == "D") { projectX = 400; }
    return projectX;
  }

function numberOfFeatures(d) { return d.numberOfFeatures.length * 10; }
function numberOfFixedBugs(d) { return d.fixedBugs.length * 10; }
function numberOfUnfixedBugs(d) { return d.unfixedBugs.length * 10 }

var month = 0;
          
    var features = svg.append("g")
        .selectAll("rect")
        .data(months[month]) 
        .enter()
        .append("rect")
        .style("fill", function() { return "#225533" } )
        .attr("width", 60)
        .attr("x", function(d) { return projectPosition(d) } )
        
        .attr("y", function(d) { return height - numberOfFeatures(d) } )
        .attr("height", function(d) { return numberOfFeatures(d) });
     
   /*  svg.append("g")
        .selectAll("rect")
        .data(months[month])
        .enter()
        .append("rect")
        .style("fill",function(){ return "#44bbcc";})
        .attr("x", function(d) { return projectPosition(d)}) 
        .attr("width", 60)
        
        .attr("y", function(d) { return (height - (numberOfFeatures(d) + numberOfFixedBugs(d) )) } )
        .attr("height", function(d) { return numberOfFixedBugs(d) });
    
/*    svg.append("g")
        .selectAll("bug")
        .data(project.unfixedBugs)
        .enter()
        .append("circle")
        .style("fill",function(){ return "red";})
        .attr("cx", function(d) { return projectPosition(project) + 30}) 
        .attr("cy", function(d) { var totalDepthOfBar = numberOfFeatures(project) + numberOfFixedBugs(project);
                                  console.log(height - totalDepthOfBar);
                                  var indexOfCurrentBug = 1 + project.unfixedBugs.indexOf(d);
                                  console.log(indexOfCurrentBug);
            return (height - totalDepthOfBar  -  ( (1+project.unfixedBugs.indexOf(d)) * 40 )  )} )//have not got this right! Do some maths...
        .attr("r", 15); */
 //}
  
function redraw() {
   
        svg.selectAll("rect") 
        .data(months[month])
        .transition()
        .duration(1000)
        .attr("y", function(d) { return height - numberOfFeatures(d) } )
        .attr("height", function(d) { return numberOfFeatures(d) });
    
    
 /* 
   svg.selectAll("rect")
        .data(data)
 6     .transition()
 7       .duration(1000)
 8       .attr("y", function(d) { return h - y(d.value) - .5; })
 9       .attr("height", function(d) { return y(d.value); });
10 */

//    draw(months[month])
    //would put the transition in here
  //  }
}

setInterval(function() {
  if (month < 1) {
    month++;
    redraw();
  }
}, 1500);



