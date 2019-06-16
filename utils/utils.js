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
