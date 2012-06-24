function init() {

    var r = Raphael("holder", 800, 800), 
    colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"],
    radius = 25,
    line = 1,
    x = 50,
    pieSpacing = radius + 55,
    y = pieSpacing * line,
    labelOffset = radius + 10,
    sortedData = sort_data();
    
   for (var year = 2010; year <= 2012; year++) {
     for (var month = 1; month <= 12; month++) {
        if (sortedData[year][month]) {
            features = sortedData[year][month]["MMF"] || 0,
            bugs = sortedData[year][month]["Bug"] || 0,
            infrastructure = sortedData[year][month]["Infrastructure"] || 0,
            maintenance = sortedData[year][month]["Maintenance"] || 0;
        
            var data = [features, bugs, infrastructure, maintenance];
        
            r.piechart(x, y, radius, data, {colors:colours})
            
            }
        r.text(x, y + labelOffset, moment.monthsShort[month] + " " + year)
            
        x += pieSpacing;
        
        if ((month+1) % 6 == 0) {
            x = 50;
            line++;
			y = pieSpacing * line;
		}
      }
    }
} 
