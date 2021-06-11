import LibFlash from "../../lib/LibFlash"
//
export async function post(req, res) {
  try{
//console.log(items)    
    LibFlash.set_falsh(req , {message: 'test123'} )
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify([]));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}