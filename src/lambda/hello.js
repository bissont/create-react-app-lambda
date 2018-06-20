const cheerio = require ('cheerio')
var request = require('request')

export function handler(event, context, callback) {
  var destination = event.queryStringParameters['to']
  request('https://www.airbnb.com/users/show/71831216', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)
      var foo = $('main div.page-container div.row div.all_reviews_block div.reviews_section div.reviews')
      .find('div.col-md-10 div.space-2 div.comment-container p').text()
      console.dir(foo);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: "Hello, World!<p>" + foo})
      })
      //console.log(html);
    }
  });
 /* console.log(destination);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!" + destination})
  })*/
}
