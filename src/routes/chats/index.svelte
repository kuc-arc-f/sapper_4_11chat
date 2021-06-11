<script context="module">
  import Config from '../../../app_config'

export async function preload() {
  var cfg = Config.get_config()
  var site_id = cfg.MY_SITE_ID
//console.log(cfg.MY_API_URL , site_id)
  var url =cfg.MY_API_URL + "/api/get/find?content=chats&site_id=" +site_id;
  const res = await this.fetch(url)
  const data = await res.json()
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
 //console.log(dataUser)
  var user_id = dataUser.id || ''
  if(user_id ==''){
    return this.redirect(302, '/login');
  }
  return {
    tasks: data ,  user_id: user_id, flash:{message:'', error:''} 
  };
}
</script>

<script>
//import { auto_update } from '../../lib/store';
import LibStorage from '../../lib/LibStorage';
LibStorage.set_exStorage("auto_update", 0)
export let tasks , flash , user_id;
console.log(user_id)

const  get_flash = async function (){
  const res = await fetch("/api/flash")
  const data = await res.json() 
  flash = data
console.log(flash)
  return data
}
get_flash()
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .flash_message{
    color : white; background: green; padding: 0.5rem;
  }
  .await_area_wrap{ display:none; }
</style>

<svelte:head>
  <title>Chat</title>
</svelte:head>

<!-- initialize -->
{#if flash.message != ''}
  <h3 class="flash_message">{flash.message}</h3>
{/if}

<h1>Chat -Index</h1>
<a href="/chats/create" class="btn btn-primary">Create</a>
<hr />
<ul>
  {#each tasks as item}
    <li><a rel="prefetch" href="/chats/{item.id}"><h3>{item.name}</h3></a>
      ID : {item.id}
      <hr class="my-1"/>
    </li>
  {/each}
</ul>
<hr />
