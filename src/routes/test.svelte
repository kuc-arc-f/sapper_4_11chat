<!-- https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores
-->
  <script context="module">
//import store from '../lib/store'
import { count } from '../lib/store';
import { auto_update , auto_reset } from '../lib/store';
//import { onDestroy } from 'svelte'

export async function preload() {
//console.log(data)
  var csfr = []
  return {csfr};
}
</script>

<script>
export  let  csfr;
//console.log(csfr)
function set_counter(){
  $count = 99
}
function set_update(){
  $auto_update = 1
}
</script>

<svelte:head>
  <title>test</title>
</svelte:head>

<h1>test Store</h1>
auto_update : {$auto_update}
<hr />
<button on:click={set_update}>Set_1</button>
<hr >
<button on:click={auto_reset}>SetUpdate</button>
<!--
<hr />
<button on:click={set_counter}>SetValue</button>
-->

