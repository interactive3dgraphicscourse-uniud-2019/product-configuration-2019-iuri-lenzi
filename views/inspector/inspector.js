function autoResize(){
    $('#inspector-controls').height($('#inspector-controls').contents().height());
    $('#inspector-controls').width($('#inspector-controls').contents().width());
}

$('#buttons-bar').on("mousedown", function(e){
    closeInspector();
    e.preventDefault();
})