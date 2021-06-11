var csrf = require('csrf');
var tokens = new csrf();
import Config from "../../../app_config"
//
export async function post(req, res) {
  try{
    const cfg = Config.get_config()
// /console.log(csrf.token)    
    var data = req.body
    var token = data._token
console.log(token)
//console.log("secret=" , secret)
    if(tokens.verify(cfg.CSRF_SECRET, token) === false)
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