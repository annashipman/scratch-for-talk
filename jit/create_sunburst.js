function init(){

   var sb = new $jit.Sunburst({
        injectInto: 'infovis',
        levelDistance: 90,
        Node: { overridable: true },
        Label: { type: "Native" },
        Events: {
          enable: true,
          onClick: function(node) {
            if(!node) return;
            var html = "<h4>" + node.name + "</h4>", data = node.data;
            if("type" in data) {
              html += "<b>Type: </b> " + data.type;
            }
            if("startDate" in data) {
              html += "<br /><br /><b>Work started on: </b> " + data.startDate;
            }
            if("endDate" in data) {
              html += "<br /><br /><b>In production on: </b><br />" + data.endDate;
            }
            if("description" in data) {
              html += data.description;
            }
            $jit.id('inner-details').innerHTML = html;
          }
        },
        Tips: {
          enable: true,
          onShow: function(tip, node) {
            var html = "<div class=\"tip-title\">" + node.name + "</div>"; 
            var data = node.data;
            if("timeTaken" in data) {
              html += "<b>Time Taken:</b> " + data.timeTaken + " days";
            }
            tip.innerHTML = html;
          }
        }
    });

    sb.loadJSON(json);
    sb.refresh(); 
    
}
