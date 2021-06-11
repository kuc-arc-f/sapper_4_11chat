
import Const from "../../../app_config"
//
export async function get(req, res, next) {
  try{
    const { id } = req.params;
//console.log("id=", id)
   
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(item));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }   
}
