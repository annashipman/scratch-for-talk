function renderTypesByMonth(){

	
	
	
	
	var colors = ["#225533" ,"#44bbcc" ,"#88dddd" ,"#bbeeff"];

	var radius = 25;
	var spacing = 55;

	var xOffSet = 1;
	var yOffSet = 1;
	
	var xPos = (radius + spacing) * xOffSet;
	var yPos = (radius + spacing) * yOffSet;



}

function drawPieForAMonth(year, month, xPos, yPos, radius, data, colors){
	
	
	pie = r.piechart(xPos, yPos, radius, data , {colors: colors, label: data});
	
	
	r.text(xPos, yPos +radius + 10, moment.monthsShort[month - 1] + " " + year  )
}







			