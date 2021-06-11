//
import { writable , derived  } from 'svelte/store';
//console.log(count);
export const auto_update = writable(0);
export const count = writable(0);

//export const increment = () => count.update(n => n + 1)
//export const auto_reset = () => auto_update.set(1)
export const auto_reset = () => auto_update.update(n => 0)


/*
export default {
  func1: function(){
    return {
      value: "123",      
    }
  },
}
*/
