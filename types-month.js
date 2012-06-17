function renderTypesByMonth() {


	//parses the json
	//stores in the form of
	// CardData.year.month.Features
	var cardTypesPerMonth = new CardData(teamData);



	var colors = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"];

	var radius = 25;
	var spacing = 55;

	var xOffSet = 1;
	var yOffSet = 1;

	var xPos = (radius + spacing) * xOffSet;
	var yPos = (radius + spacing) * yOffSet;



	for (var year = 2010; year <= 2012; year++) {
		for (var month = 1; month <= 12; month++) {
			//increment the xPos by the spacing and multiply by how much we need to move to the right
			xPos = (radius + spacing) * xOffSet;

			var numberOfFeatures = cardTypesPerMonth.countFor(year, month - 1, "Feature");
			var numberOfBugs = cardTypesPerMonth.countFor(year, month - 1, "Bug");
			var numberOfMaintenanceTasks = cardTypesPerMonth.countFor(year, month - 1, "Build Maintenance");
			var numberOfInfrastructureTasks = cardTypesPerMonth.countFor(year, month - 1, "Infrastructure");

			var data = [numberOfFeatures, numberOfBugs, numberOfMaintenanceTasks, numberOfInfrastructureTasks];
			drawPieForAMonth(year, month, xPos, yPos, radius, data, colors);

			xOffSet++;
			//draw a new line every 6 months
			//increment the yPos every 6 months to move the next line down
			if (month % 6 == 0) {
				yOffSet++;
				yPos = (radius + spacing) * yOffSet;
				xPos = 20;
				xOffSet = 1;

			}


		}
	}



}

function drawPieForAMonth(year, month, xPos, yPos, radius, data, colors) {


	pie = r.piechart(xPos, yPos, radius, data, {
		colors: colors,
		label: data
	});


	r.text(xPos, yPos + radius + 10, moment.monthsShort[month - 1] + " " + year)
}