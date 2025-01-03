import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../composables/useAuth";

const routes = [
    {
        path:'/',
        name:'home',
        component:()=>import('../views/HomeView.vue'),
        meta:{ resquiresAuth:true },
    },
    {
        path:'/login',
        name:'login',
        component: ()=>import('../views/LoginVue.vue')
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('../views/RegisterVue.vue')
    }
    
]

const router = createRouter({
    history:createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    const { checkAuth } = useAuth()
    if (to.meta.resquiresAuth && !checkAuth()) {
      next({name:'login'});
    } else {
      next(); 
    }
});

export default router;