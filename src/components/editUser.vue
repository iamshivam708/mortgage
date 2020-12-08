<template>
  <div class="container mt-5">
  <h2>Update Data</h2>
    <form class="mt-3" @submit.prevent="update" method="POST">
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
        <input type="password" class="form-control" placeholder="Enter Password" v-model="user.password">
        <input readonly type="text" class="form-control mt-3" v-bind:value="user.password">
    </div>
    <button type="submit" class="btn btn-primary">update</button>
    </form>
  </div>
</template>

<script>
export default{
name:'edit',
data(){
    return{
        id:this.$route.params.id,
        user:{}
    }
},
created(){
    let url = `http://localhost:3000/user/${this.id}`;
       this.axios.get(url).then(response =>{
           this.user = response.data;
       }).catch(err =>{
           console.error(err.message);
       })
},
methods: {
    update(){
        let url = "http://localhost:3000/user/update"
        this.axios.put(url,this.user).then(() =>{
            this.$router.push('/user');
        }).catch(err =>{
            console.error(err);
        })
    }
},
}
</script>