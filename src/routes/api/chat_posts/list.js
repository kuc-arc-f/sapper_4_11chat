import axios from 'axios'
import Config from "../../../../app_config"
import LibChatPost from '../../../lib/LibChatPost'
//
export async function get(req, res) {
  try{
//    console.log( req.query.chat_id )  
    if(typeof req.query.chat_id == 'undefined'){
      throw new Error('Invalid , query GET');
    }  
    const chat_id = req.query.chat_id
console.log("#start-List : ", new Date() )
    var cfg = Config.get_config()
    const site_id = cfg.MY_SITE_ID
    var url =cfg.MY_API_URL + "/api/get/find?content=chat_posts&site_id=" +site_id;
    const response = await axios.get(url ) 
    var items = response.data
    items = LibChatPost.get_chat_items(items , chat_id)
//console.log(d)
    var url =cfg.MY_API_URL + "/api/get/find?content=users&site_id=" +site_id;
    const resUsers = await axios.get(url ) 
    const users = resUsers.data
    items = LibChatPost.convert_users(items , users)
//console.log(d );
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(items));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify([]));
  }  
}