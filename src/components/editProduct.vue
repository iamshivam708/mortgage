<template>
    <div class="container mt-5" v-show="requiresAuth">
    <h3>Edit Product</h3>
    <form id="form" method="POST" enctype="multipart/form-data" @submit.prevent="sendFile">
    <div class="form-group">
        <input type="hidden" name="email" v-model="product.email"/>
        <input type="hidden" name="product_id" v-model="product.product_id"/>
        <input type="hidden" name="image" v-model="product.image"/>
    </div>
   <div class="form-group row">
    <div class="col-6">
        <input type="file" ref="file" name="file" class="form-control" @change="fileInput" accept="image/*" />
    </div>
    <div class="col-6">
        <img :src="'/..//api/uploads/'+product.image" height="100px" width="100px"  /> 
    </div>  
    </div>
    <div class="form-group">
    <label>Title</label>
        <input type="text" name="title" placeholder="Product Title" class="form-control" v-model="product.title"/>   
    </div>
    <div class="form">
        <select name="category" v-model="product.category" class="form-control">
        <option v-for="category in categories" :key="category.cat_id">{{category.category}}</option>
        </select>
    </div>
    <div class="form-group">
    <label>Description</label>
        <input type="text" name="description" placeholder="Product Description" class="form-control" v-model="product.description" />   
    </div>
    <div class="form-group">
    <label>Price</label>
        <input type="text" name="price" placeholder="Price for Mortgage" class="form-control"  v-model="product.price"/>   
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
name:'editProduct',
data(){
    return{
        requiresAuth: false,
        product:{},
        categories:{}
    }
},
created(){
    if(this.$session.exists()){
        this.requiresAuth = true;
        const id = this.$route.params.id;
        let url = `http://localhost:3000/user/details/${id}`;
        this.axios.get(url).then((response) =>{
           this.product = response.data[0];
        })
        let url2= "http://localhost:3000/other/cat"
       this.axios.get(url2).then(response =>{
           this.categories = response.data;
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
        let uri = "http://localhost:3000/user/product/update"
        this.axios.put(uri,formData);
        this.$router.push('/user');
        location.reload();
    }
}
}
</script>

<style>

</style>