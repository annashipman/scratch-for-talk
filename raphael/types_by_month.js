function init() {

    var r = Raphael("holder", 600, 800), 
    colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"],
    radius = 25,
    x = 50,
    y = 50,
    labelOffset = radius + 10;
	
    var sortedData = sort_data(),
        year = 2012,
        month = 0, //months go 0-11 in JS
        features = sortedData[year][month]["MMF"] || 0,
        bugs = sortedData[year][month]["Bug"] || 0,
        infrastructure = sortedData[year][month]["Infrastructure"] || 0,
        maintenance = sortedData[year][month]["Maintenance"] || 0;
    
    var data = [features, bugs, infrastructure, maintenance];
    
    r.piechart(x, y, radius, data, {colors:colours})
    r.text(x, y + labelOffset, moment.monthsShort[month] + " " + year)
    
} 
