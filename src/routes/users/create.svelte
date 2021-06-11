<script context="module">
import Config from '../../../app_config'

export async function preload() {
  var cfg = Config.get_config()
  const content = "users"
  var url = cfg.MY_API_URL+ `/api/get/count?content=${content}&site_id=${cfg.MY_SITE_ID}`  
  const res = await this.fetch(url);
  const data = await res.json();
//console.log(data.count)
  if(parseInt(data.count) >= cfg.MY_MAX_USER){
    console.log("error. max user=", data.count)
    return this.redirect(302, '/');
  }
//  return { user_count: data.count };
}
</script>

<script>
export let user_count;
//console.log(user_count)
const  get_token = async function (){
  const res = await fetch("/api/get_token")
  const data = await res.json() 
  return data
}
async function handleClick() {
//  alert('clicked')
  await add_item()
}
async function add_item(){
  try {
    var elemName = document.getElementById('name');
    var elemEmail = document.getElementById('email');
    var elemPassword = document.getElementById('password');
    var elemToken = document.getElementById('_token');
    var item = {
      name:  elemName.value,
      email:  elemEmail.value,
      password: elemPassword.value,
      created_at: new Date(),
      _token: elemToken.value,
    }
//console.log(item)
    var body = JSON.stringify(item)
    const res = await fetch( '/api/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
      },
      body: body,
    });
    if (res.status != 200) {
      alert("Error save")
      throw new Error(await res.text());
    }
//  console.log(response.data)
    window.location.href = '/login'
  } catch (error) {
    console.error(error);
  }    
}
//console.log(posts)
</script>
<style>
.await_area_wrap{ display:none; }
</style>

<!-- initialize -->
{#await get_token() }
<p>Loading get_token.</p>
{:then data}
<div class="await_area_wrap">
  <input type="text" name="_token" id="_token" value={data._token} />
</div>
{/await}

<svelte:head>
	<title>Create</title>
</svelte:head>
<h1>Users-Create</h1>
<hr />
<div class="form-group">
  Name:
  <input type="text" class="form-control" name="name" id="name" /><br />
  <hr />
  Email:
  <input type="text" class="form-control" name="email" id="email" /><br />
  <hr />
  password:
  <input type="password" class="form-control" name="password" id="password" />
</div>
<hr />
<button on:click={handleClick}>Save</button>
