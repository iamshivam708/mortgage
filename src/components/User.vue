<template>
  <div v-show="requiresAuth" class="container" align="center" style="padding:40px;">
  <div class="card">
  <h2 class="card-title">User Details</h2>
  <hr/>
    <div class="card-body">
        <p><strong>Name:</strong> {{user.fname}}&nbsp;{{user.lname}}</p>
        <p><strong>Email:</strong> {{user.email}}</p>
        <p><strong>Phone:</strong> {{user.phone}}</p>
        <p><strong>Address:</strong> {{user.address}}</p>
        <router-link :to="'/edit/'+ this.$session.id()" class="btn btn-primary">Edit</router-link>
    </div>
    <div class="card-footer">
        <h3>User's Messages</h3>
        <table class="table">
        <tr>
            <th>User</th>
            <th>Message</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Product_id</th>
            <th>Action</th>
        </tr>
        <tr v-for="msg in msgs" v-bind:key="msg.offer_id">
            <td>{{msg.fname}}&nbsp;{{msg.lname}}</td>
            <td>{{msg.message}}</td>
            <td>{{msg.email}}</td>
            <td>{{msg.phone}}</td>
            <td>{{msg.product_id}}</td>
            <td><router-link :to="'/confirm/'+msg.offer_id" class="btn btn-primary">Confirm</router-link></td>
            <td><button @click="deleteOffer(msg.offer_id)" class="btn btn-danger">Delete</button></td>
        </tr>
        </table>
    </div>
    <div class="card-footer">
        <h3>Confirmed Users</h3>
        <table class="table">
        <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Product_id</th>
        </tr>
        <tr v-for="getData in getDatas" v-bind:key="getData.confirm_id">
            <td>{{getData.fname}}&nbsp;{{getData.lname}}</td>
            <td>{{getData.email}}</td>
            <td>{{getData.phone}}</td>
            <td>{{getData.product_id}}</td>
        </tr>
        </table>
    </div>
  </div>
    <div class="row mt-4">
    <div class="col-12">
        <h3>Your Products</h3>
        <table class="table">
        <thead class="thead-dark">
            <tr>
            <th scope="col">#Id</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col" colspan="2">Action</th>
            <th><router-link to="/add" class="btn btn-primary">Add</router-link></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" v-bind:key="product.product_id">
                <td>{{product.product_id}}</td>
                <td><img :src="'..//api/uploads/'+product.image" height="50px" width="50px" class="img-fluid"></td>
                <td>{{product.title}}</td>
                <td>{{product.description}}</td>
                <td>&#8377; {{product.price}}</td>
                <td><router-link :to="'/product/edit/'+ product.product_id"  class="btn btn-primary">Edit</router-link>
                <td><button @click="deleteProduct(product.product_id)" class="btn btn-danger">Delete</button></td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
name:'user',
data(){
    return{
        requiresAuth: false,
        user:{},
        products:{},
        msgs:{},
        confirm:{},
        getDatas:{}
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
    var email = this.$session.get('email');
    let uri = `http://localhost:3000/user/show/${email}`;
    this.axios.get(uri).then((response) =>{
        this.products = response.data;
    })

    var email = this.$session.get('email');
    let url2 = `http://localhost:3000/msg/${email}`;
    this.axios.get(url2).then((response) =>{
        this.msgs= response.data;
    })

    var email = this.$session.get('email');
    let url3 = `http://localhost:3000/get/data/${email}`;
    this.axios.get(url3).then(response =>{
        this.getDatas = response.data;
    })
},
methods:{
    deleteProduct(id){ 
        let url = `http://localhost:3000/user/product/delete/${id}`;
        this.axios.delete(url);
        location.reload();
    },
    deleteOffer(id){
        let url = `http://localhost:3000/delete/msg/${id}`;
        this.axios.delete(url);
        location.reload();
    }
}
}
</script>

<style>

</style>