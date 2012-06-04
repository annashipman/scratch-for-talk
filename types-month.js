function renderTypesByMonth(paper){

	var colorPalette = ["#225533" ,"#44bbcc" ,"#88dddd" ,"#bbeeff"];

	var year = 2010;
	var month = 1;
	var radius = 25;
	var xPos = 75;
	var yPos = 75;

	var numberOfFeatures = countCards(year, 1, "MMF");
	var numberOfBugs = countCards(year, 1, "Bug");
	var numberOfMaintenanceTasks = countCards(year, 1, "Bug");
	var numberOfInfrastructureTasks = countCards(year, 1, "Bug");

	var data = [numberOfFeatures, numberOfBugs, numberOfMaintenanceTasks, numberOfInfrastructureTasks];
	pie = paper.piechart(xPos, yPos, radius, data , {colors: colorPalette, label: data});
	paper.text(xPos, yPos +radius + 10, moment.monthsShort[0] + " " + year  )
}

function countCards(year, month, cardType){
	//count the number of entries, that were created on Option
	//month is zero based so subtract 1
	 return teamData.filter(
    						function(e, index, arr){
    							var raisedOn = moment(e["Option"], "DD/MM/YYYY");
    								return (
    									e["Type"] === cardType  && 
    										raisedOn.month() == (month - 1) &&
    										raisedOn.year() == year
    										);
    									}
    								).length;
}
			