var csrf = require('csrf');
var tokens = new csrf();
import axios from 'axios'
import Config from "../../../../app_config"
import LibFlash from "../../../lib/LibFlash"
//
export async function post(req, res) {
  try{
    var cfg = Config.get_config()
    var data = req.body
    const secret = req.session.secret
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    } 
    var id = data.id 
    var item = {
      id: data.id,
    };    
console.log("id=" , id)    
    var content = "tasks"
    const url = cfg.MY_API_URL + '/api/post/delete/' + content
    const response = await axios.post(url , item ,
      { headers: { 'Content-Type': 'application/json', 'apikey': cfg.MY_API_KEY } }    
    )
console.log(response.data )    
    var ret ={ id:1 } 
    LibFlash.set_falsh(req , {message: 'Success , delete complete'} )      
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
  }  
}