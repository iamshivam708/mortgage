<template>
  <div>
    <h5 v-show="!requiresAuth">login to see</h5>
    <h3 v-show="requiresAuth">Welcome</h3>
  </div>
</template>

<script>
export default {
name:'index',
data(){
  return{
    requiresAuth:false
  }
},
created(){
  if(this.$session.exists()){
    this.requiresAuth = true;
  }
}
}
</script>

<style>

</style>