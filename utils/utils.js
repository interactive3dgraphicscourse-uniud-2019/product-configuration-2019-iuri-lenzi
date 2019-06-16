function read(filePath, callback){
    var client = new XMLHttpRequest();
    client.open('GET', filePath);
    client.onreadystatechange = function() {
        if(client.readyState === 4)
        {
            if(client.status === 200 || client.status == 0)
            {
                callback(client.responseText);
            }
        }
    }
    client.send();
}

function applyTemplate(template, placeholders=[], tag = "#container"){
	read(template, function(content){
        placeholders.forEach(function(placeholder){
            content = content.replace(placeholder[0], placeholder[1]);
        });
		$(tag).html(content);	
	})
}

function loadGlsl(filePath){
    read(filePath, function(content){
        var tag = content.split("\n")[0]
        tag = tag.substring(2, tag.length);
        materialVector.forEach(function(element){
            if(element.vertexShader == tag){
                element.vertexShader = content;
            }
            if(element.fragmentShader == tag){
                element.fragmentShader = content;
            }
        });
        todo.delete(tag);
        if(todo.size == 0){
            document.dispatchEvent(new CustomEvent("loading-complete", { }));
        }
    })
}

function openFullscreen(id) {
    var elem = window.parent.document.getElementById(id);
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
    $("#compress").removeClass("invisible");
    $("#compress").addClass("visible");
    $("#expand").removeClass("visible");
    $("#expand").addClass("invisible");
}

/* Close fullscreen */
function closeFullscreen() {
    if (window.parent.document.exitFullscreen) {
        window.parent.document.exitFullscreen();
    } else if (window.parent.document.mozCancelFullScreen) { /* Firefox */
        window.parent.document.mozCancelFullScreen();
    } else if (window.parent.document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        window.parent.document.webkitExitFullscreen();
    } else if (window.parent.document.msExitFullscreen) { /* IE/Edge */
        window.parent.document.msExitFullscreen();
    }
    $("#expand").removeClass("invisible");
    $("#expand").addClass("visible");
    $("#compress").removeClass("visible");
    $("#compress").addClass("invisible");
}

function explode(){
    renderAnimation = renderExplosion;
    $("#implode").removeClass("invisible");
    $("#implode").addClass("visible");
    $("#explode").removeClass("visible");
    $("#explode").addClass("invisible");
}

function implode(){
    renderAnimation = renderImplosion;
    $("#explode").removeClass("invisible");
    $("#explode").addClass("visible");
    $("#implode").removeClass("visible");
    $("#implode").addClass("invisible");
}