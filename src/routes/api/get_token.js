var csrf = require('csrf');
var tokens = new csrf();

//
export async function get(req, res) {
  try{
    var secret = tokens.secretSync();
    var token = tokens.create(secret);
    req.session.secret = secret;
console.log(secret, token)
    var ret = {
      _token: token,
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}