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
        user:{},
        msg:'',
        currentUser:{}
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
    }
}
}
</script>

<style>

</style>