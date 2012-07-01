function sort_data() {

    var data = team_data,
        sortedData = [],
        index = {};

    //get all the dates from the data
    data.forEach(function(task) { 
        var dateFinished = moment(task["In Production"], "DD/MM/YYYY");
        
        if (dateFinished) {
            var month = dateFinished.month() 
                year = dateFinished.year(),
                date_string = month+"-"+year;

            if(index[date_string] === undefined) {
                var monthString = moment.monthsShort[month] + " " + year;
                var monthData = {
                    month: month,
                    year: year,
                    monthString: monthString,
                    features: 0,
                    bugs: 0,
                    infrastructure: 0,
                    maintenance: 0
                }
                index[date_string] = sortedData.push(monthData) - 1; //returns new length, not index 
            }
                var data = sortedData[index[date_string]],
                       taskType = task.Type;
                if ("MMF"===taskType){
                    data.features++;
                } else if ("Bug"===taskType) {
                    data.bugs++;
                } else if ("Infrastructure"===taskType){
                    data.infrastructure++;
                } else if ("Maintenance"===taskType) {
                    data.maintenance++;
                } 
            // } else {
            //     var monthString = moment.monthsShort[month] + " " + year;
            //     var monthData = {
            //         month: month,
            //         year: year,
            //         monthString: monthString,
            //         features: 0,
            //         bugs: 0,
            //         infrastructure: 0,
            //         maintenance: 0
            //     }
            //     index[date_string] = sortedData.push(monthData) - 1; //returns new length, not index 
            // }
        }    
    });

    var anotherArray = sortedData.sort(function(a, b) {
        if (a.year === b.year) return a.month - b.month;
        return a.year - b.year;}
    );

    //console.log(sortedData.join(" , "));
    console.log(sortedData);
}
