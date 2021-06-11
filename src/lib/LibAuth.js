
var csrf = require('csrf');
var tokens = new csrf();

//
export default {
  valid_mail_user: function(items , email){
    try{
      var ret = null
      items.forEach(function(item){
//console.log(item );
        if(item.email === email){
          ret = item
        }
      });      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, valid_mail_user');
    }
  },   
  get_user:async function(req){
    try{
//console.log(flash_message)
      var arr = {}
      if(typeof req.session.user == 'undefined'){
        return arr
      }
      arr = req.session.user
      return arr
    } catch (e) {
      console.log(e);
      throw new Error('error, get_user');
    }
  },  

}