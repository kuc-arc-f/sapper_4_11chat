var csrf = require('csrf');
var tokens = new csrf();
import axios from 'axios'

import Config from "../../../../app_config"
import LibFlash from "../../../lib/LibFlash"
//
export async function post(req, res) {
  try{
    var cfg = Config.get_config()
//console.log(cfg.MY_API_URL , cfg.MY_API_KEY)
    var data = req.body
    const secret = req.session.secret
    /*
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }
    */
//console.log(data)
    var content = "chat_posts"
    const url = cfg.MY_API_URL + '/api/post/create/' + content
    const response = await axios.post(url , data ,
      { headers: { 'Content-Type': 'application/json', 'apikey': cfg.MY_API_KEY } }    
    )     
console.log(response.data );
    /*
    */
    // LibFlash.set_falsh(req , {message: 'Success save'} ) 
//console.log(items)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }  
}