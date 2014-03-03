var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    osc = require("node-osc")

    port = process.argv[2] || 8888;


http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

    path.exists(filename, function(exists){
        if (uri.substr(0,4) == '/del'){
            var param = uri.replace('.js','').replace('/del','').split('-');
            console.log(param[0]+ ' / '+param[1]);
            var client = new osc.Client('10.4.0.15', 10000);
            client.send('/sushi', parseInt(param[0]), param[1]);
        }
        if (uri.substr(0,4) == '/osc'){
            var param = uri.replace('.js','').replace('/osc','').split('-');
            console.log(param[0]+ ' / '+param[1]);
            var client = new osc.Client('10.4.0.15', 10000);
            client.send('/sushi', parseInt(param[0]), parseInt(param[1]));
        }
        if (!exists) { 
            Response_404(); return ;
        }
        if (fs.statSync(filename).isDirectory()) { filename += '/index.html'; }

        fs.readFile(filename, "binary", function(err, file){
            if (err) { Response_500(err); return ; }
            Response_200(file, filename);   
        }); 

    });




    function Response_200(file, falename){
        var extname = path.extname(filename);
        var headerStr = {
            '.json':{
                'Content-Type':'application/json; charset=utf-8',
                'Access-Control-Allow-Origin':'*',
                'Pragma': 'no-cache',
                'Cache-Control' : 'no-cache'
                },
        }
        headerStr['.topojson'] = headerStr['.geojson'] = headerStr['.csv'] =  headerStr['.json'];
        var header = (headerStr[extname]) ? headerStr[extname] : null;

        response.writeHead(200, header);
        response.write(file, "binary");
        response.end();
    }  


    function Response_404(){
          response.writeHead(404, {"Content-Type": "text/plain"});
          response.write("404 Not Found\n");
          response.end();
    }  

    function Response_500(err){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
    }  


}).listen(parseInt(port, 10));

console.log("Server running at http://localhost:" + port );