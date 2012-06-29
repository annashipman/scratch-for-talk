function init() {
	
	var r = Raphael("holder", 600, 800),
		colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"],
		sortedData = sort_data(),
		x = 125,
		y = 125,
		radius = 100,
		labelOffset = radius + 10,
		year = 2012,
		month = 1, 
        features = sortedData[year][month]["MMF"] || 0,
        bugs = sortedData[year][month]["Bug"] || 0,
        infrastructure = sortedData[year][month]["Infrastructure"] || 0,
        maintenance = sortedData[year][month]["Maintenance"] || 0,
        data = [features, bugs, infrastructure, maintenance];

		r.piechart(x, y, radius, data, {colors:colours})
		r.text(x, y + labelOffset, moment.monthsShort[month] + " " + year);

}
