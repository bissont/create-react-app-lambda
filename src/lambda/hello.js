const cheerio = require ('cheerio')
var request = require('request')
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var URI = require('urijs');

export function handler(event, context, callback) {
  console.log("bar");
  var destination = event.queryStringParameters['to']
  console.log("entiering" + destination);
  var score = 0
  var array = destination.split('/');
  var id = array[array.length-1]
  var nurl ="https://www.airbnb.com/users/review_page/" + id + "?page=";
  console.log(nurl)
  getData(nurl,1, function(foo) {
      //console.log (foo.split(" ").length)
  //    console.log (foo)
     var score = sentiment.analyze(foo).comparative;
      callback(null, {
      statusCode: 200,
      body: JSON.stringify({msg: score})
    })
  });
  
  
}

function getData(url, page, callback) {
  var newurl= url + page + "&host"
  request(newurl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(html)
      console.log(obj.review_ids.length)
      const $ = cheerio.load(obj.review_content)
      var foo = $('.expandable-content').text().trim()
      
      if (obj.last_page == false) {
        // recursivelly call getData(asynch function) and issue callback with recussed
        // data + foo (current data)
        getData(url, page +1, (recdata) => {
          callback(foo + recdata)
        })
      } else  {
        /* base case*/
        callback(foo);
      }
    } else {
      console.log("bye");
    }
  });
}
