import LibAuth from "../../lib/LibAuth"
//
export async function get(req, res) {
  try{
    var user = await LibAuth.get_user(req)
//console.log(user)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(user));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
  }  
}