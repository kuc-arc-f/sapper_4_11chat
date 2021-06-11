import moment from 'moment'
//
export default {
  get_params: function(){
    return {
      ACTIVE_UPDATE_SEC: 30,      
      NON_ACTIVE_UPDATE_SEC: 600,
      STATE_ACTIVE: 1,      
      STATE_NON_ACTIVE: 2,      
      STATE_DISPLAY_ACTIVE: "Active",      
      STATE_DISPLAY_NONE : "noneActive",      
    }
  },
  get_remain_time(init_time, now_time){
    const bef = moment(init_time)
    const now = moment(now_time)
    let duration = moment.duration(now.diff(bef), 'milliseconds'); 
    //差分をミリ秒で取得し、ミリ秒→durationへ変換
    let min = duration.minutes()
//    let time = duration.minutes() + ":" + duration.seconds();
    let time = (min * 60) + duration.seconds();
//console.log(time)
    return time
  },
  get_stat_label(stat){
    const cfg = this.get_params()
    var ret = cfg.STATE_DISPLAY_NONE
//    const max = cfg.STATE_ACTIVE 
    if(stat == cfg.STATE_ACTIVE){
      ret = cfg.STATE_DISPLAY_ACTIVE
    }   
    return ret
  },
  get_next_time(sec, stat){
    var ret = 0
    const cfg = this.get_params()
    const max = cfg.ACTIVE_UPDATE_SEC
    ret = max - sec
    return ret
  },
  /* ret:true = update */
  valid_update(sec, stat){
    var ret = false;
    const cfg = this.get_params()
    var max = cfg.ACTIVE_UPDATE_SEC
    if(stat == cfg.STATE_ACTIVE){
      if(sec >= max){
        ret = true
      }
    }
//    max = cfg.NON_ACTIVE_UPDATE_SEC
//console.log(cfg)
    return ret
  },
  get_chat_items: function(items , chat_id){
    try{
      var ret = []
      items.forEach(function(item){
        if(item.chat_id == chat_id){
          ret.push(item)
        }
      });      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_chat_items');
    }
  },  
  convert_users: function(items , users){
    try{
      var ret = []
      items.forEach(function(item){
        users.forEach(function(user){
          if(item.user_id == user.id){
            item.user = user
//console.log(item );
            ret.push(item)
          }
        })
      });      
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, convert_users');
    }
  },  

}
