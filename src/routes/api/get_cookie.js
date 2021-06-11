
//
export async function get(req, res) {
  try{
    var cookieVal = req.cookies;
//console.log( "cookieVal=", cookieVal)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    var ret = {cookie: cookieVal }
    res.end(JSON.stringify(ret));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
    res.end(JSON.stringify({}));
  }  
}