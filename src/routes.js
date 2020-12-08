import Index from './components/Index.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import User from './components/User.vue'
import editUser from './components/editUser'
import addProduct from './components/addProduct'
import editProduct from './components/editProduct'

export default[
    {path:'/', name:'index', component: Index},
    {path:'/signup', name:'signup', component: Signup},
    {path:'/login', name:'login', component: Login},
    {path:'/user',name:'user', component: User},
    {path:'/edit/:id', name:'edit', component: editUser},
    {path:'/add', name:'add', component:addProduct},
    {path:'/product/edit/:id', name:'editproduct', component:editProduct}
]