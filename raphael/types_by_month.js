function init() {
    var r = Raphael("holder", 600, 800);
    
    var data = [10, 10, 24, 50];
    var colours = ["red", "green", "blue", "#bbeeff"];
    r.piechart(125, 125, 100, data, {colors: colours});
    
}
