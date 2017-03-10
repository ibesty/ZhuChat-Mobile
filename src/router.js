import Vue from 'vue'
import Router from 'vue-router'
import ChatListInterface from './components/ChatListInterface.vue'
import ChatViewInterface from './components/ChatViewInterface.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/list',
        name: 'ChatListInterface',
        component: ChatListInterface
    },{
        path: '/chat/:userID',
        name: 'ChatViewInterface',
        component: ChatViewInterface
    },{
        path: '/',
        redirect: '/list'
    }]
})