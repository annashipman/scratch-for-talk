function sort_data() {

    var data = team_data; //from the json
    
    var sortedData = []
    
    data.forEach(function(task) { 
        var dateFinished = moment(task["In Production"], "DD/MM/YYYY");
        if (dateFinished) {
            var month = dateFinished.month() 
                year = dateFinished.year(),
                taskType = task["Type"]
        
		    if(sortedData[year] == undefined) sortedData[year] = new Object(); 
		    if(sortedData[year][month] == undefined) sortedData[year][month] = new Object();
		    if(sortedData[year][month][taskType] == undefined) sortedData[year][month][taskType] = [];
		    
		    sortedData[year][month][taskType].push(task["Feature ID"]); 
        }
	});
	
	//I am not sure that sortedData is what I'd expect it to be at this point
	return sortedData;
}

