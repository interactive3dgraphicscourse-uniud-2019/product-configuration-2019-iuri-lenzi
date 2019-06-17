/*
* General purpose funtions
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


/*
* read any file and launch the callback funcion on the content
*/
function Read(filePath, callback){
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


/*
* Inject a view in the current page
*/
function ApplyTemplate(template, placeholders=[], tag = "#container"){
	Read(template, function(content){
        placeholders.forEach(function(placeholder){
            content = content.replace(placeholder[0], placeholder[1]);
        });
		$(tag).html(content);	
	})
}


/*
* Load shader definition from a glsl file
*/
function LoadGlsl(filePath){
    Read(filePath, function(content){
        var tag = content.split("\n")[0];
        tag = tag.replace("\r", "");
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


/*
* Start fullscreen mode
*/
function OpenFullscreen(id) {
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


/*
* End fullscreen mode
*/
function CloseFullscreen() {
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


/*
* Start the explosion animation
*/
function Explode(){
    $("#implode").removeClass("invisible");
    $("#implode").addClass("visible");
    $("#explode").removeClass("visible");
    $("#explode").addClass("invisible");

    group.children.forEach(function(child){
        if(child instanceof AnimatedMesh){
            child.Explode();
        } else if(child instanceof AnimatedGroup){
            child.children.forEach(function(c){
                c.Explode(500)
            })
        }
    }) 
}


/*
* Start the implosion animation
*/
function Implode(){
    $("#explode").removeClass("invisible");
    $("#explode").addClass("visible");
    $("#implode").removeClass("visible");
    $("#implode").addClass("invisible");

    group.children.forEach(function(child){
        if(child instanceof AnimatedMesh){
            child.Implode();
        } else if(child instanceof AnimatedGroup){
            child.children.forEach(function(c){
                c.Implode(500)
            })
        }
    }) 
}


/*
* Scene lock algorithm
*/

var sceneLocked = false;


function Lock(){
    $("#unlock").removeClass("invisible");
    $("#unlock").addClass("visible");
    $("#lock").removeClass("visible");
    $("#lock").addClass("invisible");
    window.parent.document.body.className += " stop-scrolling"
    sceneLocked = true;
}


function Unlock(){
    $("#lock").removeClass("invisible");
    $("#lock").addClass("visible");
    $("#unlock").removeClass("visible");
    $("#unlock").addClass("invisible");
    window.parent.document.body.className = window.parent.document.body.className.replace(/stop-scrolling/g, "");
    sceneLocked = false;
}