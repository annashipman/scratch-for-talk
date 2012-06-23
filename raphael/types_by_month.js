function init() {

    var r = Raphael("holder"), 
    colours = ["#225533", "#44bbcc", "#88dddd", "#bbeeff"];
    
    r.piechart(125, 125, 100, [10,10,25,50], {colors:colours})
    
}
