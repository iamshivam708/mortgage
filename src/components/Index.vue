<template>
  <div class="container-fluid mt-5" align="center">
    <h3 v-show="!requiresAuth">Login To See</h3>
    <div class="row" v-show="requiresAuth">
      <div class="col-2" style="border-right:2px solid red">
      <h2>Categories</h2>
      </div>

      <div class="col-10" style="padding-left:60px">
          <h2>All Posts</h2>
          <div class="container">
          <div class="row" v-for="product in products" v-bind:key="product.product_id">
              <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                <img class="card-img-top" :src="'../api/uploads/'+product.image" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">{{product.title}}</h5>
                    <p class="card-text">&#8377; {{product.price}}</p>
                    <router-link :to="'/singlePost/'+product.product_id" class="btn btn-primary">Click To See</router-link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
name:'index',
data(){
  return{
    requiresAuth:false,
    products:{}
  }
},
created(){
  if(this.$session.exists()){
    this.requiresAuth = true;
    let url = "http://localhost:3000/user/getAll";
    this.axios.get(url).then(response =>{
      this.products = response.data;
    })
  }
}
}
</script>

<style>

</style>