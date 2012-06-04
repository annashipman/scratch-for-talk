function renderTypesByMonth(paper){

	var colorPalette = ["#225533" ,"#44bbcc" ,"#88dddd" ,"#bbeeff"];
	var numberOfFeatures = countCards(2010, 1, "MMF");
	var numberOfBugs = countCards(2010, 1, "Bug");
	var numberOfMaintenanceTasks = countCards(2010, 1, "Bug");
	var numberOfInfrastructureTasks = countCards(2010, 1, "Bug");

	var data = [numberOfFeatures, numberOfBugs, numberOfMaintenanceTasks, numberOfInfrastructureTasks];
	pie = paper.piechart(75, 75, 25, data , {colors: colorPalette, label: data});
	paper.text(75, 110, moment.monthsShort[0] + " " + 2010  )
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
			