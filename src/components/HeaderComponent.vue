<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav offset-5">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-show="!requiresAuth">
            <router-link class="nav-link" to="/signup">Signup</router-link>
          </li>
          <li class="nav-item" v-show="!requiresAuth">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" style="cursor:pointer" v-show="requiresAuth">
           <router-link class="nav-link" to="/user">User</router-link>
          </li>
          <li class="nav-item" style="cursor:pointer" v-show="requiresAuth">
            <a class="nav-link" @click="logout(email)">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
data(){
  return{
    requiresAuth: false,
    sess_id: this.$session.id(),
    email:''
  }
},
created(){
if (this.$session.exists()) {
      this.requiresAuth = true;
      this.email = this.$session.get('email');
    }
},
methods:{
  logout(email){
    let uri = `http://localhost:3000/delete/${email}`;
         this.axios.delete(uri).then(() =>{
         })
         this.$session.destroy();
        this.$router.push('/login');
        location.reload();
  }
}
}
</script>

<style>

</style>