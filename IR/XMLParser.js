var parseString = require('xml2js').parseString;
var http = require('https');
var fs = require('fs');



//taken from http://antrikshy.com/blog/fetch-xml-url-convert-to-json-nodejs
function xmlToJson(url, callback, path) {
  var req = http.get(url, function(res) {
    var xml = '';

    res.on('data', function(chunk) {
      xml += chunk;
    });

    res.on('error', function(e) {
      callback(e, null);
    });

    res.on('timeout', function(e) {
      callback(e, null);
    });

    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result, path);
      });
    });
  });
}

function callback(err, data, path) {
  if (err) {
    return console.err(err);
  }
  fs.writeFile(path, JSON.stringify(data, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log(path + " was saved!");
  });
  //console.log(JSON.stringify(data, null, 2)) ;
}

var url1 = 'https://courses.illinois.edu/cisapp/explorer/schedule/2018/spring/CS.xml?mode=cascade'
var url2 = 'https://courses.illinois.edu/cisapp/explorer/schedule/2017/fall/CS.xml?mode=cascade'

var filePath2017 = "C:/Users/mikes/Desktop/courseplanner/IR/Files/2018Data.txt";
var filePath2018 = "C:/Users/mikes/Desktop/courseplanner/IR/Files/2017Data.txt";

xmlToJson(url1,callback, filePath2017);
xmlToJson(url2,callback,filePath2018);


// xmlToJson(url, function(err, data) {
//   if (err) {
//     // Handle this however you like
//     return console.err(err);
//   }

  // Do whatever you want with the data here
  // Following just pretty-prints the object
//   console.log(JSON.stringify(data, null, 2)) ;
// })




// var convert = require('xml-js');
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//
// var x = new XMLHttpRequest();
// x.open("GET", "https://courses.illinois.edu/cisapp/explorer/schedule/2018/spring/CS.xml?mode=cascade", true);
// x.onreadystatechange = function () {
//   if (x.readyState == 4 && x.status == 200)
//   {
//     var xml = x.responseXML;
//     var result = convert.xml2json(xml, {compact: false, spaces: 4});
//     console.log(result, '\n');
//
//   }
// };
// x.send(null);
