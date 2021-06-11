<script>
import axios from 'axios'
export let user_id;
async function handleClick() {
//console.log('clicked')
  await proc_logout()
}  
async function proc_logout(){
  const response = await axios.get("/api/users/logout") 
//console.log(response.data ); 
  window.location.href = '/login'
}
</script>

<style>
</style>

<div class="login_box_wrap">
{#if user_id != ''}
  <button on:click={handleClick}>Logout</button>
  <hr />
{/if}
</div>