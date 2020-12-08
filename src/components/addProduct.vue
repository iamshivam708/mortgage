<template>
  <div class="container mt-5" align="center" v-show="requiresAuth">
    <h3>Add A Product</h3>
    <form id="form" method="POST" enctype="multipart/form-data" @submit.prevent="sendFile">
    <div class="form-group">
        <input type="hidden" readonly name="email" v-model="user.email" class="form-control" />
    </div>
   <div class="form-group">
        <input type="file" ref="file" name="file" class="form-control" @change="fileInput" accept="image/*" />   
    </div>
    <div class="form-group">
        <input type="text" name="title" placeholder="Product Title" class="form-control" v-model="product.title"/>   
    </div>
    <div class="form-group">
        <input type="text" name="description" placeholder="Product Description" class="form-control" v-model="product.description" />   
    </div>
    <div class="form-group">
        <input type="text" name="price" placeholder="Price for Mortgage" class="form-control"  v-model="product.price"/>   
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
name:'add',
data(){
    return{
        requiresAuth: false,
        user:{},
        product:{
            title:'',
            description:'',
            price:'',
            file:''
        }
    }
},
created(){
    if(this.$session.exists()){
        this.requiresAuth = true;
        const id = this.$session.id();
       let url = `http://localhost:3000/user/${id}`;
       this.axios.get(url).then(response =>{
           this.user = response.data;
       }).catch(err =>{
           console.error(err.message);
       })
    }else{
        this.$router.push('/');
    }
},
methods:{
    fileInput(){
        this.file = this.$refs.file.files[0];
    },
    sendFile(){
        var form = document.getElementById('form');
        var formData = new FormData(form);
        let uri = 'http://localhost:3000/user/file'
        this.axios.post(uri,formData)
        this.$router.push('/user');
        location.reload();
    }
}
}
</script>

<style>

</style>