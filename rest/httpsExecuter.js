const  http = require('tls'),
fs = require('fs');


exports.getHttpsRequest = ((requestBody, options) => {

   

return new Promise((resolve, reject) => {

    ///validate message
    
    options.cert = fs.readFileSync('rest/certs/localhost_cert.pem');
    options.key= fs.readFileSync('rest/certs/localhost_key.pem') ;
    
 // Check if the authorization worked
    var client =  http.connect(options,conn => {
        
        if (conn.authorized) {
            console.log("Connection authorized by a Certificate Authority.");
        } else {
            console.log("Connection not authorized: " + client.authorizationError)
        }
        conn.write(JSON.stringify(requestBody));
       
        conn.on("data", function(data) {

            console.log('Received: %s [it is %d bytes long]',
                data.toString().replace(/(\n)/gm,""),
                data.length);
                resolve(JSON.parse(body));
            // Close the connection after receiving the message
            conn.end()});
        });
  
     
           
    // let request = http.request(options, function (res) {
    // let chunks = [];

    //     res.on("data", function (chunk) {
    //         chunks.push(chunk);
    //     });

    //     res.on("end", function () {
    //         var body = Buffer.concat(chunks).toString();              
    //         resolve(JSON.parse(body));
    //     });
    // });

    // if (typeof requestBody !== 'undefined'){
    // request.write(JSON.stringify(requestBody));
    // }
    // request.end();
});
});