function renderTypesByMonth(paper){

	var colorPalette = ["#225533" ,"#44bbcc" ,"#88dddd" ,"#bbeeff"];

	var year = 2010;
	var month = 1;
	var radius = 25;
	var xPos = 75;
	var yPos = 75;

	drawPieForAMonth(paper, year, month, xPos, yPos, radius ,colorPalette);

}

function drawPieForAMonth(paper, year, month, xPos, yPos, radius, colorPalette){
	
	var numberOfFeatures = countCards(year, month, "MMF");
	var numberOfBugs = countCards(year, month, "Bug");
	var numberOfMaintenanceTasks = countCards(year, month, "Bug");
	var numberOfInfrastructureTasks = countCards(year, month, "Bug");

	var data = [numberOfFeatures, numberOfBugs, numberOfMaintenanceTasks, numberOfInfrastructureTasks];
	pie = paper.piechart(xPos, yPos, radius, data , {colors: colorPalette, label: data});
	pie.hover(hoverIn, hoverOut);
	
	paper.text(xPos, yPos +radius + 10, moment.monthsShort[0] + " " + year  )
}

function hoverIn(){
	//stop scale animation if it already exists
	this.sector.stop();
	//create a popup and add to the flag object so we can clear it later
	this.flag = paper.popup(this.mx, this.my, this.value.value)
				.attr({
						fill: "0-#c9de96-#8ab66b:44-#398235",
						stroke: "#000"});
	//how big the slice expands
	this.sector.scale(1.5, 1.5, this.cx, this.cy);
	
    if (this.label) {
        this.label[0].stop();
        this.label[0].attr({ r: 7.5 });
        this.label[1].attr({ "font-weight": 800 });
    }
 }

function hoverOut(){
	this.flag.animate({opacity: 0}, 300, function () {this.remove();});
	this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
	if (this.label) {
    	this.label[0].animate({ r: 5 }, 500, "bounce");
        this.label[1].attr({ "font-weight": 400 });
    }
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
			