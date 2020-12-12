<template>
  <div class="container-fluid">
    <div class="row">
        <div class="col-10" style="padding:50px">
        <div class="card" align="center">
            <h1 class="card-title">Post Description</h1>
            <span ><img :src="'..//api/uploads/'+product.image" width="50%" class="img-fluid"></span>
            <div class="card-body">
            <button class="offset-5 btn btn-danger" v-on:click="Like" v-show="disabled">Like</button>
            <h3>{{totalLikes}}</h3>
            <button class="offset-5 btn btn-danger" v-on:click="Dislike" v-show="!disabled">Disike</button>
                <h2 class="mt-2">Title: {{product.title}}</h2>
                <h2 class="mt-2" style="color:red">Mortgaged Price: &#8377;{{product.price}}</h2>    
                <h4>Description: {{product.description}}</h4>
            </div>
        </div>
        <div class="card mt-5" align="center">
            <h1 class="card-title">Mortgagor Details</h1>
            <div class="card-body">
                <h2>Name: {{user.fname}}&nbsp;{{user.lname}}</h2>  
                <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Send Offer</button>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Offer Your Proposal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <form method="POST" @submit.prevent="offer">
                        <input type="hidden" :value="user.fname"/>
                        <input type="hidden" :value="user.mname"/>
                        <input type="hidden" :value="user.lname"/>
                        <input type="hidden" :value="user.email"/>
                        <input type="hidden" :value="user.phone">
                        <input type="hidden" :value="product.email"/>
                        <textarea v-model="msg" class="form-control mt-3" placeholder="Enter Proposal" rows="3" col="3"></textarea>
                        <input type="hidden" class="form-control mt-3" :value="product.product_id"/>
                        <button type="submit" class="btn btn-primary mt-3">Send Proposal</button>
                    </form>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
        </div>
        <div class="col-2 mt-5">
            <div class="card" align="center">
                <h3>Search</h3>
                <form @submit.prevent="search" method="post">
                <input type="text" v-model="query" class="form-control"/>
                <button class="btn btn-primary">Search</button>
                </form>
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
        user:{},
        msg:'',
        currentUser:{},
        totalLikes:'',
        disabled:false,
        alreadyLiked:'',
        query:''
    }
},
created(){
    const id = this.$route.params.id;
    let url = `http://localhost:3000/user/details/${id}`;
    this.axios.get(url).then((response) =>{
        this.product = response.data[0];
    })
    let url2 = `http://localhost:3000/user/post/details/${id}`;
    this.axios.get(url2).then((res) =>{
       this.user = res.data[0];
    })

    var email = this.$session.get('email');
    let url3 = `http://localhost:3000/currentUser/${email}`;
    this.axios.get(url3).then(r =>{
        this.currentUser = r.data[0];
    })
    let url4 = `http://localhost:3000/other/likes/${this.$route.params.id}`;
        this.axios.get(url4).then(response =>{
        this.totalLikes = response.data;
      })

    let url5 = "http://localhost:3000/other/check";
    const details = {
        product_id: this.$route.params.id,
        email:  this.$session.get('email')
    }
    this.axios.post(url5,details).then(response =>{
       this.alreadyLiked = response.data;
       if(this.alreadyLiked != 1){
           this.disabled = true;
       }
    })
},
methods:{
    offer(){
        let url="http://localhost:3000/user/offer";
        const offer = {
            user_email: this.product.email,
            product_id: this.product.product_id,
            fname: this.currentUser.fname,
            mname: this.currentUser.mname,
            lname: this.currentUser.lname,
            email: this.currentUser.email,
            phone: this.currentUser.phone,
            msg: this.msg
        }
        this.axios.post(url,offer).then(response =>{
            alert("message has been sent successfully");
            this.$router.push('/user');
            location.reload();
        })
    },
    Like(){
    let url ="http://localhost:3000/other";
    let details = {
        email: this.$session.get('email'),
        product_id: this.$route.params.id
    }
    this.axios.post(url,details).then(response =>{
        console.log(response);
        location.reload();
    })
    },
    Dislike(){
    var product_id = this.$route.params.id;
    var email = this.$session.get('email');
    let url =`http://localhost:3000/other/delete/${product_id}&${email}`;
    this.axios.delete(url);
        location.reload();
    },
    search(){
        this.$router.push('/search/'+ this.query);
    }
}
}
</script>

<style>

</style>