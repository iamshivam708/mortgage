<template>
  <div class="container mt-5">
  <h2>Login</h2>
    <form class="mt-3" method="POST" @submit.prevent="login">
    <div class="form-group">
        <input type="email" class="form-control" placeholder="Enter Email" v-model="user.email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" v-model="user.password" placeholder="Password" @keypress="show">
      <input type="text" class="form-control mt-2" :class="isActive" :value="user.password" readonly>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
name:'login',
data(){
    return{
        user:{
            email:'',
            password:''
        },
        isActive: "d-none"
    }
},
methods:{
  show(){
    this.isActive = '';
  },
  login(){
     let url = "http://localhost:3000/login";
     this.axios.post(url,this.user).then((response) =>{
       var email = response.data[0].email;
       this.$session.start();
       this.$session.set('email',email);
       const user = {
         sess_id: this.$session.id(),
         email: this.$session.get('email')
       }
       let url2 = "http://localhost:3000/insert";
       this.axios.post(url2,user).then((response) =>{
         console.log(response);
         this.$router.push('/');
         location.reload();
       })
       }).catch(err =>{
        Swal.fire({
          text: 'Email And Password wrong!',
          icon: 'error',
          title: 'Oops...',
        })
          console.log(err);
        })
}
}
}
</script>

<style>

</style>