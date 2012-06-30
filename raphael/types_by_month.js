function init() {


   var r = Raphael("holder", 2000, 800),
       colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"],
       sortedData = sort_data(),
       flag;
   
   var x = 50,
       line = 1,
       radius = 25,
       labelOffset = radius + 10,
       pieSpacing = radius + 55,
       y = pieSpacing*line;
 
	var lineX = [], lineYFeatures = [], lineYBugs = [], lineYInfrastructure = [];
        
        for (var month = 0; month <= 11; month++) {
            var year = 2011;
                features = sortedData[year][month]["MMF"] || 0,
                bugs = sortedData[year][month]["Bug"] || 0,
                infrastructure = sortedData[year][month]["Infrastructure"] || 0,
                maintenance = sortedData[year][month]["Maintenance"] || 0;
    
            var data = [features, bugs, infrastructure, maintenance];
    
            var pie = r.piechart(x, y, radius, data, {colors:colours}); 
            
            pie.hover(
            	//hover in	
            	function() { 
            		flag = r.flag(this.mx, this.my, this.value.value) 
            	}, 
            	//hover out
            	function(){ 
            		flag.remove()
            	});	
            
            lineX.push(month);
            lineYFeatures.push(features);
            lineYBugs.push(bugs);
            lineYInfrastructure.push(infrastructure);
            
            r.text(x, y + labelOffset, moment.monthsShort[month] + " " + year);
            x += pieSpacing;
            
            if ((month+1) % 6 == 0) {
                x = 50;
                line++;
		        y = pieSpacing * line;
	        }
        }
      
    x += pieSpacing;
    line++;
    y = pieSpacing * line;
	var legendOptions = { 
		legend: ["Features", "Bugs", "Infrastructure", "Maintenance"], 
		legendpos: "east",  
		label: [25, 25, 25, 25], 
		colors: colours}
	pie = r.piechart(x, y, radius, [25, 25, 25, 25], legendOptions);
	
	 r.linechart(700, 60, 300, 220, lineX, 
	 	[lineYFeatures, lineYBugs], { 
	 	axis: "0 0 1 1", //TRBL
	 	axisxstep: 11, //how often we want to number the x axis
	 	smooth: true, 
	 	colors: colours })

}