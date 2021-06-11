var csrf = require('csrf');
var tokens = new csrf();
const bcrypt = require('bcrypt');
import axios from 'axios'

import LibAuth from "../../../lib/LibAuth"
import Config from "../../../../app_config"
//
export async function post(req, res) {
  try{
    var cfg = Config.get_config()
    var data = req.body
//console.log(data)    
    var retArr= {ret:0, user_id:0}
    const secret = req.session.secret
    if(tokens.verify(secret, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }
    var site_id = cfg.MY_SITE_ID
    //console.log(cfg.MY_API_URL , site_id)
    const url =cfg.MY_API_URL + "/api/get/find?content=users&site_id=" +site_id; 
    const response = await axios.get(url)     
//console.log(response.data );   
    var user = LibAuth.valid_mail_user(response.data , data.email ) 
    if(user != null){
// console.log(user);
      if (data.email === user.email
        && bcrypt.compareSync(data.password,  user.password )){
          retArr.ret = 1
          retArr.user_id = user.id 
          user.password='' 
          req.session.user = user;    
      }
    }   
//console.log(items)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(retArr));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }  
}