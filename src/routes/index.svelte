<script context="module">

export async function preload() {
  const resUser = await this.fetch("/api/get_user")
  const dataUser = await resUser.json()
 //console.log(dataUser)
  var user_id = dataUser.id || ''
  return {user_id: user_id};
}
</script>
  
<script>
import LibStorage from '../lib/LibStorage';
LibStorage.set_exStorage("auto_update", 0)
export let user_id;
console.log(user_id)
import LoginBox from '../components/LoginBox.svelte'
</script>

<style>
  h1, figure, p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }
  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<LoginBox user_id={user_id}/>
<h3>sapper , App sample</h3>
<hr />
<p>welcome, this is top page.</p>
