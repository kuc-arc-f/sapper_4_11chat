import LibFlash from "../../lib/LibFlash"
//
export async function get(req, res) {
  try{
    var flash = await LibFlash.get_falsh(req)
console.log(flash)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(flash));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}