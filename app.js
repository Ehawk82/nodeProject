var http = require('http'),
    express = require('express'),
    fs = require('fs'),
    formidable = require('formidable');

var app = express();

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '\\uploads\\' + file.name;
    });

    form.on('file', function (name, file){
        var fn = '<img src="/'+file.name+'" class="item" onclick="makeBig(this)" minheight="50px" maxheight="50px"  height="50" width="auto" />';
        fs.appendFile('log.html', fn, function (err) {
          if (err) throw err;
        });
        console.log('Uploaded ' + fn);
    });

    res.sendFile(__dirname + '/uploaded.html');
});
app.get('/assets', function (req, res){
    app.use(express.static(__dirname + '/uploads'));
    res.sendFile(__dirname + '/log.html');
});
app.listen(8080);