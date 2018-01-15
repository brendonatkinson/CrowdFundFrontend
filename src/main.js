import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Users from './Users.vue';
import Projects from './Projects.vue';
import Project from './Project.vue';
import CreateProject from './CreateProject.vue'
import VueResource from 'vue-resource';
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';
import VueSession from 'vue-session';
import VuePaginate from 'vue-paginate'

Vue.use(VuePaginate);
Vue.use(VueSession);
Vue.use(VueResource);
Vue.use(VModal, { dialog: true });
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: '/login',
                name: 'login',
                component: Users
            },
            {
                path: '/register',
                name: 'register',
                component: Users
            },
            {
                path: '',
                name: 'projects',
                component: Projects
            },
            {
                path: '/profile',
                name: 'profile',
                component: Users
            },
            {
                path: '/project',
                name: 'project',
                component: Project
            },
            {
                path: '/new',
                name: 'newproject',
                component: CreateProject
            }

        ]
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
