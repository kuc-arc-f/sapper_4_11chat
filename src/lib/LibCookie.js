// LibCookie
import moment from 'moment'
//
export default {
  set_cookie: function(key, value){
    try{
      var dt = moment().add(10, 'year').toDate().toUTCString()
//      console.log( dt );
      document.cookie = `${key}=${value}; path=/; expires=${dt}`;
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },
  get_cookie: function(key){
    try{
    } catch (e) {
      console.log(e);
      throw new Error('error, get_cookie');
    }
  },
  /*
  valid_cookie: function(user_id){
    try{
      console.log(typeof user_id)
      if( user_id == ''){
        console.log("nothing, user_id")
      }       
    } catch (e) {
      console.log(e);
      throw new Error('error, get_cookie');
    }
  },
  */
}