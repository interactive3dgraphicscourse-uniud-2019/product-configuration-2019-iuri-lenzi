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