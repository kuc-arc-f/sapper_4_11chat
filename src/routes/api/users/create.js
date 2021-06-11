var csrf = require('csrf');
var tokens = new csrf();
const bcrypt = require('bcrypt');
import axios from 'axios'

import Config from "../../../../app_config"
//
export async function post(req, res) {
  try{
    var cfg = Config.get_config()
//console.log(cfg.MY_API_URL , cfg.MY_API_KEY)    
    var data = req.body
//console.log(data)
    const secret = req.session.secret
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    } 
    let hashed_password = bcrypt.hashSync(data.password, 10);
    data.password = hashed_password
    var content = "users"
    const url = cfg.MY_API_URL + '/api/post/create/' + content
    const response = await axios.post(url , data ,
      { headers: { 'Content-Type': 'application/json', 'apikey': cfg.MY_API_KEY } }    
    )
console.log(response.data );         
    /*
    */
    var ret ={ item:data }    
//console.log(items)    
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