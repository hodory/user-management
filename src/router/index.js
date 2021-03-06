import Vue from 'vue'
import Router from 'vue-router';
import store from '../store';
import UserList from "../components/UserList";
import Login from "../components/Login";

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
    const isAuthenticated = localStorage.getItem('user-management.accesstoken') ? true : false;
    if (isAuthenticated) {
        if (store.state.accessToken === null) {
            store.state.accessToken = localStorage.getItem('user-management.accesstoken');
        }
        return next();
    }
    next('/?returnPath=user/list')
};

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Login
        },
        {
            path: '/user/list',
            name: 'UserList',
            component: UserList,
            beforeEnter: requireAuth(),
            meta: {
                progress: {
                    func: [
                        {call: 'color', modifier: 'temp', argument: '#ffb000'},
                        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
                        {call: 'location', modifier: 'temp', argument: 'top'},
                        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
                    ]
                }
            }
        }
    ]
})
