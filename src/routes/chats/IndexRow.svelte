<script>
export let name , body, date;
//console.log(user_id)
</script>

<style>
.chat_row_name_wrap{font-weight: bold;}
</style>

<!---->
<div class="chat_row_wrap">
  <span class="chat_row_name_wrap">{name}</span> , {date}
  <pre>{body}</pre>
  <hr class="my-0" />
</div>
