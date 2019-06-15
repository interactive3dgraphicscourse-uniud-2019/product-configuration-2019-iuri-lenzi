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