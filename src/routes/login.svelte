<script context="module">
//import Config from '../../../app_config'

export async function preload() {
}
</script>

<script>
import LibStorage from '../lib/LibStorage';
LibStorage.set_exStorage("auto_update", 0)
//var cfg = Config.get_config()
//console.log(cfg.MY_API_URL , cfg.MY_API_KEY)  

const  get_token = async function (){
  const res = await fetch("/api/get_token")
  const data = await res.json() 
  return data
}
async function handleClick() {
//  alert('clicked')
  await valid_item()
}
async function valid_item(){
  try {
    var elemEmail = document.getElementById('email');
    var elemPassword = document.getElementById('password');
    var elemToken = document.getElementById('_token');
    var item = {
      email:  elemEmail.value,
      password: elemPassword.value,
      created_at: new Date(),
      _token: elemToken.value,
    }
//console.log(item)
    const res = await fetch( '/api/users/auth_check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (res.status != 200) {
      throw new Error(await res.text());
    }
    const json = await res.json()
    if(json.ret != parseInt(1) ){
      alert("Error, login")
      return
    }
console.log(json.user_id)
    alert("Success, login")
    window.location.href = '/'
  } catch (error) {
    console.error(error);
  }    
}
//console.log(posts)
</script>

<style>
.await_area_wrap{ display:none; }
</style>

<svelte:head>
	<title>Login</title>
</svelte:head>

<!-- initialize -->
{#await get_token() }
<p>Loading get_token.</p>
{:then data}
<div class="await_area_wrap">
  <input type="text" name="_token" id="_token" value={data._token} />
</div>
{/await}

<h1>Login</h1>
<hr />
<div class="form-group">
  Email:
  <input type="text" class="form-control" name="email" id="email" /><br />
  <hr />
  password:
  <input type="password" class="form-control" name="password" id="password" />
</div>
<hr />
<button on:click={handleClick}>Login</button>
<hr />
<a href="/users/create">[ Register ]</a>

