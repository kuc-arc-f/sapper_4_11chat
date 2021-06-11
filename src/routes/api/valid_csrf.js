var csrf = require('csrf');
var tokens = new csrf();
//
export async function post(req, res) {
  try{
    var data = req.body
    var token = data._token
//console.log(req.session)
    const secret = req.session.secret
console.log("secret=" , secret)
    if(tokens.verify(secret, token) === false)
    {
        throw new Error('Invalid Token');
    }else{
        console.log("Success, Token");
    }
    var ret = {
       ret: 0,
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }  
}