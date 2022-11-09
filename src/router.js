import {createRouter, createWebHistory} from 'vue-router'
import AllTasks from './views/AllTasks'
import NewTask from './views/NewTask'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AllTasks },
        { path: '/new', component: NewTask },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

