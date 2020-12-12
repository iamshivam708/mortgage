<template>
  <div class="container-fluid mt-5" align="center">
    <h3 v-show="!requiresAuth">Login To See</h3>
    <div class="row" v-show="requiresAuth">
      <div class=" d-none d-lg-block col-sm-2" style="border-right:2px solid red">
      
      <form @submit.prevent="search" method="post">
      <input type="text" v-model="query" class="form-control"/>
      <button class="btn btn-primary">Search</button>
      </form>

      <h2>Categories</h2>
      <ul class="list-group" v-for="category in categories" v-bind:key="category.cat_id">
        <li class="list-group-item"><router-link :to="'/category/'+category.category">{{category.category}}</router-link></li>
      </ul>
      </div>

      <div class="col-10" style="padding-left:60px">
          <h2>All Posts</h2>
          <div class="container">
          <div class="row">
              <div class="col-sm-6 col-md-6 col-lg-3 mt-3" v-for="product in products" v-bind:key="product.product_id">
                <div class="card">
                <img class="card-img-top" :src="'../api/uploads/'+product.image" alt="Card image cap" height="200">
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
name:'search',
data(){
  return{
    requiresAuth:false,
    products:{},
    categories:{},
    query :'',
    searched:this.$route.params.search
  }
},
watch:{
    '$route' (to, from){
        if(to.fullPath != from.fullPath){
            location.reload();
        }
    }
},
created(){
  if(this.$session.exists()){
    this.requiresAuth = true;
    let url = `http://localhost:3000/other/search/${this.searched}`;
    this.axios.get(url).then(response =>{
      this.products = response.data;
    })
  let url2 = "http://localhost:3000/other/cat";
    this.axios.get(url2).then(response =>{
      this.categories = response.data;
    })
  }
},
methods:{
  search(){
    this.$router.push('/search/'+ this.query);
  }
}
}
</script>

<style>

</style>