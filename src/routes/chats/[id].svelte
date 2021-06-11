<script context="module">
import ChatPostConfig from '../../lib/LibChatPost'
import IndexRow from './IndexRow.svelte'
import Config from '../../../app_config'
//
export async function preload({ params }) {
  var cfg = Config.get_config()
  const content = "chats"
  var url = cfg.MY_API_URL+ `/api/get/findone?content=${content}&id=${params.id}`
  const res = await this.fetch(url);
  const data = await res.json();	
//  var site_id = cfg.MY_SITE_ID
  //var url =cfg.MY_API_URL + "/api/get/find?content=chat_posts&site_id=" +site_id;
  //const resPost = await this.fetch(url);
  //const dataPost = await resPost.json();
//console.log(data)
  if (res.status != 200) {
    this.error(res.status, data.message);
  }
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
console.log(dataUser)
  var user_id = dataUser.id || ''
  if(user_id ==''){
    return this.redirect(302, '/login');
  }
  return { 
    chat: data ,user: dataUser , chat_id: params.id,
  };
}
</script>

<script>
import LibChatPost from '../../lib/LibChatPost'
import LibStorage from '../../lib/LibStorage';
//const d = LibStorage.get_exStorage("auto_update")
//console.log( d )
LibStorage.set_exStorage("auto_update", 1)
var cfg = Config.get_config()
//var site_id = cfg.MY_SITE_ID
const postCfg= ChatPostConfig.get_params()
var params = {
  INIT_TIME : new Date(),
  STAT : postCfg.STATE_ACTIVE,
  STAT_DISPLAY : postCfg.STATE_DISPLAY_ACTIVE,
  REMAIN_TIME : 0,
}
export let chat , user, DATA = params, chat_id, chat_posts =[];
console.log("chat_id=" ,chat_id)
//console.log(user.id)

var timer_func =async function(){
  const sec = LibChatPost.get_remain_time(DATA.INIT_TIME, new Date() )
  const valid = LibChatPost.valid_update(sec, DATA.STAT)
  DATA.REMAIN_TIME = LibChatPost.get_next_time(sec, DATA.STAT)
  const auto_update = LibStorage.get_exStorage("auto_update")
  if(parseInt(auto_update) == 1){
    if(valid){
      DATA.INIT_TIME = new Date()
      proc_update()
    }
    timeout_next();
  }
//console.log("window=", typeof window);
  if(typeof window !== 'undefined' ){
//    console.log(DATA.STAT, sec, valid , auto_update );
  }
};
function timeout_next(){
  setTimeout(timer_func, 1000 );
}
timeout_next()

const proc_update = async function (){
  const res = await fetch("/api/chat_posts/list?chat_id=" + chat_id);
  const data = await res.json();
  chat_posts = data
//console.log(data)	
}
proc_update()
//active
//console.log("window=", typeof window )
if(typeof window !== 'undefined' ){
  window.addEventListener('blur', () => {
    DATA.STAT = postCfg.STATE_NON_ACTIVE;
    DATA.STAT_DISPLAY = LibChatPost.get_stat_label(DATA.STAT);
    console.log('inactive');
  });
  window.addEventListener('focus', () => {
    DATA.STAT = postCfg.STATE_ACTIVE;
    DATA.STAT_DISPLAY = LibChatPost.get_stat_label(DATA.STAT);
    console.log('active');
  });
}
async function handleClick() {
  await add_item()
}
async function add_item(){
  try {
    var elemBody = document.getElementById('body');
    var elemToken = document.getElementById('_token');
    var item = {
      chat_id: chat_id,
      body: elemBody.value,
      user_id : user.id,
//      _token: elemToken.value,
    }
console.log(item)
    const res = await fetch( '/api/chat_posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      throw new Error(await res.text());
    }
    elemBody.value = ""
console.log(await res.json())
    await proc_update()
/*
*/
    } catch (error) {
      console.error(error);
    }    
}
</script>

<style>
</style>

<svelte:head>
  <title>{chat.name}</title>
</svelte:head>

<div class="container">
  <div class="row">
    <div class="col-sm-6"><h1>{chat.name}</h1>
    </div>
    <div class="col-sm-6"><p>ID : {chat.id}</p>
    </div>
  </div>
  {#if DATA.STAT == postCfg.STATE_ACTIVE}
    <span class="mr-2 badge rounded-pill bg-primary">{DATA.STAT_DISPLAY} </span>
  {:else}
    <span class="mr-2 badge rounded-pill bg-secondary">{DATA.STAT_DISPLAY} </span>
  {/if} 
  <span>next: </span>
  <span class="badge rounded-pill bg-light text-dark">{DATA.REMAIN_TIME} Sec
  </span>
  <hr class="my-1" />
  <div class="row">
    <div class="col-sm-9">
      <textarea class="form-control" name="body" id="body" rows="3" />
    </div>
    <div class="col-sm-3">
      <button class="mt-2 btn btn-outline-primary" on:click={handleClick} >
        Post</button>
    </div>
  </div>
  <hr class="my-1" />
  {#each chat_posts as item}
    {#if item.user_id == user.id}
      <div class="bg-light">
        <IndexRow name={item.user.name} body={item.body} date={item.created_at} />
      </div> 
    {:else}
      <div>
        <IndexRow name={item.user.name} body={item.body} date={item.created_at} />
      </div> 
    {/if} 
  {/each}  

</div>
