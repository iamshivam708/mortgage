<template>
  <div>
    <h1>welcome to confirm page</h1>
    <table>
        <tr>
            <th>offer id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Product_id</th>
            <th>action</th>
        </tr>
        <tr>
            <td>{{confirm.offer_id}}</td>
            <td>{{confirm.fname}}&nbsp;{{confirm.lname}}</td>
            <td>{{confirm.email}}</td>
            <td>{{confirm.phone}}</td>
            <td>{{confirm.product_id}}</td>
            <td><button @click="deleteConfirm(confirm.offer_id)" class="btn btn-danger">Delete</button></td>
        </tr>
    </table>    
  </div>
</template>

<script>
export default {
name:'confirm',
data(){
    return{
        confirm:{},
        id: this.$route.params.id
    }
},
created(){
    let url=`http://localhost:3000/confirm/offer/${this.id}`;
    this.axios.get(url).then(response =>{
        this.confirm = response.data[0];
    })
},
methods:{
    deleteConfirm(){
        let url = 'http://localhost:3000/confirm';
        this.axios.post(url,this.confirm).then(response =>{
            
            let url2 = `http://localhost:3000/confirm/offer/${this.id}`;
            this.axios.delete(url2);
            this.$router.push('/user');
            location.reload();
        })
    }
}
}
</script>

<style>

</style>