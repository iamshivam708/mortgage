<template>
  <div class="container mt-5">
  <h2>Signup</h2>
    <form class="mt-3" @submit.prevent="signup" method="POST">
    <div class="form-group row">
        <div class="col-4">
            <input type="text" class="form-control" placeholder="Enter First Name" v-model="user.fname">
        </div>
        <div class="col-4">
            <input type="text" class="form-control" placeholder="Enter Middle Name" v-model="user.mname">
        </div>
        <div class="col-4">
            <input type="text" class="form-control" placeholder="Enter Last Name" v-model="user.lname">
        </div>
    </div>
    <div class="form-group row">
        <input type="email" class="form-control" placeholder="Enter Email" v-model="user.email">
    </div>
    <div class="form-group row">
        <input type="text" class="form-control" placeholder="Enter Address" v-model="user.address">
    </div>
    <div class="form-group row">
        <input type="tel" class="form-control" placeholder="Enter Phone" v-model="user.phone">
    </div>
    <div class="form-group row">
        <input type="password" class="form-control" placeholder="Enter Password" v-model="user.password" @keypress="show">
        <input readonly type="text" class="form-control mt-3" :class="isActive" v-bind:value="user.password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
name:'signup',
data(){
    return{
        user:{
            fname:'',
            mname:'',
            lname:'',
            email:'',
            address:'',
            phone:'',
            password:''
        },
        isActive: "d-none"
    }
},
methods:{
    signup(){
        let url = 'http://localhost:3000/signup'
        this.axios.post(url,this.user).then((Response) =>{
            this.$router.push({name: 'index'});
        })
    },
    show(){
        this.isActive = '';
    }
}
}
</script>

<style scoped>
.container{
    padding:60px ;
}
</style>