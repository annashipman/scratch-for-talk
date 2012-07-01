function sort_data() {

    var data = team_data; 
    
    var sortedData = [];

    console.log("hiya anna!");
    var index = {};


    //get all the dates from the data
    data.forEach(function(task) { 
        var dateFinished = moment(task["In Production"], "DD/MM/YYYY");
        
        if (dateFinished) {
            var month = dateFinished.month() 
                year = dateFinished.year(),
                date_string = month+"-"+year;
                console.log(typeof(month) + " " + typeof(year));

            if(index[date_string] !== undefined) {
                var data = sortedData[index[date_string]];
                // set data. features ./ bugs right...
            } else {
                var monthString = moment.monthsShort[month] + " " + year;
                var monthData = {
                    month: month,
                    year: year,
                    monthString: monthString,
                    features: 0,
                    bugs: 0,
                    toString: function() {return this.monthString;}
                }
                index[date_string] = sortedData.push(monthData); 
            }
        }    
    });

    console.log("before sort", sortedData.join(" , "));
    var anotherArray = sortedData.sort(function(a, b) {
        if (a.year === b.year) return a.month - b.month;
        return a.year - b.year;}
    );

    console.log(sortedData.join(" , "));
    console.log(sortedData);


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

