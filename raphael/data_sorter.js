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
            
            if(year === 2011 && sortedData.indexOf(month) === -1) {
                var monthString = moment.monthsShort[month] + " " + year;
                var monthData = {
                    month: month,
                    monthString: monthString,
                    features: 0,
                    bugs: 0
                }
                sortedData.push(monthData);
            } else {
                //increment the tasks
            }
        }    
    });

    console.log(sortedData.length)

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

