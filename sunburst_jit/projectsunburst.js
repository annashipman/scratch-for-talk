function init(){

var sb = new $jit.Sunburst({
        injectInto: 'infovis',
        Node: {
          overridable: true,
        },
    });


    sb.loadJSON(json);
    sb.refresh(); 

}
