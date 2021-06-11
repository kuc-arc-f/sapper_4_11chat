
//
export async function get(req, res) {
  try{
console.log(req.session)
    var sessionVal = req.session.token;
console.log( "session.token=",sessionVal)    
    var session_csrf = req.session.secret;
console.log( "session_secret=",session_csrf)    
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify([]));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}