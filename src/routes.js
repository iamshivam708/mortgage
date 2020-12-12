import Index from './components/Index.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import User from './components/User.vue'
import editUser from './components/editUser'
import addProduct from './components/addProduct'
import editProduct from './components/editProduct'
import singlePost from './components/singlePost'
import Confirm from './components/Confirm'
import Category from './components/Category'
import Search from './components/Search'

export default[
    {path:'/', name:'index', component: Index},
    {path:'/signup', name:'signup', component: Signup},
    {path:'/login', name:'login', component: Login},
    {path:'/user',name:'user', component: User},
    {path:'/edit/:id', name:'edit', component: editUser},
    {path:'/add', name:'add', component:addProduct},
    {path:'/product/edit/:id', name:'editproduct', component:editProduct},
    {path:'/singlepost/:id',name:'singlepost', component:singlePost},
    {path:'/confirm/:id', name:'confirm', component: Confirm},
    {path:'/category/:category',name:'category',component: Category},
    {path:'/search/:search',name:'search', component: Search}
]