export function handler(event, context, callback) {
  var destination = event.queryStringParameters['to']

  console.log(destination);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({msg: "Hello, World!" + destination})
  })
}
