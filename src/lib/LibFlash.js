
var csrf = require('csrf');
var tokens = new csrf();

//
export default {
  set_falsh:async function(req, flash_message){
    try{
//console.log(flash_message)
      var arr = {message:'', error:''}
      if(  typeof flash_message.message != 'undefined'){
        arr.message= flash_message.message
        req.session.flash = arr;
      }
    } catch (e) {
      console.log(e);
      throw new Error('error, set_falsh');
    }
  },
  get_falsh:async function(req){
    try{
//console.log(flash_message)
      var arr = {message:'', error:''}
      if(typeof req.session.flash == 'undefined'){
        return arr
      }
      const flash_message = req.session.flash
      if(  typeof flash_message.message != 'undefined'){
        arr.message= flash_message.message
      }
      if(  typeof flash_message.error != 'undefined'){
        arr.error= flash_message.error
      }
      delete req.session.flash;
      return arr
    } catch (e) {
      console.log(e);
      throw new Error('error, get_falsh');
    }
  },  

}