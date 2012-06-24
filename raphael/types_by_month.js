function init() {

    var r = Raphael("holder", 2000, 800), 
    colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"],
    radius = 25,
    line = 1,
    x = 50,
    pieSpacing = radius + 55,
    y = pieSpacing * line,
    labelOffset = radius + 10,
    sortedData = sort_data();
    
    var lineX = [], lineYFeatures = [], lineYBugs = [], lineYInfrastructure = [];
    
  // for (var year = 2010; year <= 2012; year++) {
     for (var month = 0; month <= 11; month++) {
        var year = 2011;
        if (sortedData[year][month]) {
            features = sortedData[year][month]["MMF"] || 0,
            bugs = sortedData[year][month]["Bug"] || 0,
            infrastructure = sortedData[year][month]["Infrastructure"] || 0,
            maintenance = sortedData[year][month]["Maintenance"] || 0;
            
            lineX.push(month);
            lineYFeatures.push(features);
            lineYBugs.push(bugs);
            lineYInfrastructure.push(infrastructure);
        
            var data = [features, bugs, infrastructure, maintenance];
        
            r.piechart(x, y, radius, data, {colors:colours});
            }
        r.text(x, y + labelOffset, moment.monthsShort[month] + " " + year)
            
        x += pieSpacing;
        
        if ((month+1) % 6 == 0) {
            x = 50;
            line++;
			y = pieSpacing * line;
		}
      }
  //  }
    
    x += pieSpacing;
    line++;
    y = pieSpacing * line;
	var legendOptions = { 
		legend: ["Features", "Bugs", "Infrastructure", "Maintenance"], 
		legendpos: "east",  
		label: [25, 25, 25, 25], 
		colors: colours}
	pie = r.piechart(x, y, radius, [25, 25, 25, 25], legendOptions);
	
   r.linechart(700, 60, 300, 220, lineX, [lineYFeatures, lineYBugs, lineYInfrastructure], { nostroke: false, axis: "0 0 1 1", symbol: "rect", smooth: true, colors: colours })
} 
