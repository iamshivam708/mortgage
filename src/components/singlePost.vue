<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-10" style="padding:50px">
        <div class="card" align="center">
            <h1 class="card-title">Post Description</h1>
            <span ><img :src="'..//api/uploads/'+product.image" width="50%" class="img-fluid"></span>
            <div class="card-body">
                <h2 class="mt-2">Title: {{product.title}}</h2>
                <h2 class="mt-2" style="color:red">Mortgaged Price: &#8377;{{product.price}}</h2>    
                <h4>Description: {{product.description}}</h4>
            </div>
        </div>
        <div class="card mt-5" align="center">
            <h1 class="card-title">Mortgagor Details</h1>
            <div class="card-body">
                <h2 class="mt-2">Name: {{user.fname}}&nbsp;{{user.lname}}</h2>
                <h4 class="mt-2">Email: {{user.email}}</h4>    
                <h4>Phone: {{user.phone}}</h4>
                <h4>Address: {{user.address}}</h4>
            </div>
        </div>
        </div>
        <div class="col-2">
            <div class="card" align="center">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
name:'singlepost',
data(){
    return{
        product:{},
        user:{}
    }
},
created(){
    const id = this.$route.params.id;
    let url = `http://localhost:3000/user/details/${id}`;
    this.axios.get(url).then((response) =>{
        this.product = response.data[0];
    })
    var email= this.$session.get('email')
    let url2 = `http://localhost:3000/details/user/${email}`;
    this.axios.get(url2).then((res) =>{
        this.user = res.data[0];
    })
}
}
</script>

<style>

</style>