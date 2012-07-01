function sort_data() {

    var data = team_data; 
    
    var sortedData = [];

    console.log("hiya anna!");

    //get all the dates from the data
    data.forEach(function(task) { 
        var dateFinished = moment(task["In Production"], "DD/MM/YYYY");
        
        
        if (dateFinished) {
            var month = dateFinished.month() 
                year = dateFinished.year();
            var monthString = moment.monthsShort[month] + " " + year;

            if(sortedData.indexOf(monthString) === -1) {
                sortedData.push(monthString);
            }
        }    
    });

    console.log(sortedData)

    //go through the 

        // if sortedData

    
 //    data.forEach(function(task) { 
 //        var dateFinished = moment(task["In Production"], "DD/MM/YYYY");
 //        if (dateFinished) {
 //            var month = dateFinished.month() 
 //                year = dateFinished.year(),
 //                taskType = task["Type"];
        
	// 	    if(sortedData[year] == undefined) sortedData[year] = new Object(); 
	// 	    if(sortedData[year][month] == undefined) sortedData[year][month] = new Object();
	// 	    if(sortedData[year][month][taskType] == undefined) sortedData[year][month][taskType] = 0;
		    
	// 	    sortedData[year][month][taskType] ++; 
 //        }
	// });
	
	// return sortedData;
}

