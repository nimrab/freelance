import {createRouter, createWebHistory} from 'vue-router'
import AllTasks from './views/AllTasks'
import NewTask from './views/NewTask'
import TaskItem from './views/TaskItem'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: AllTasks },
        { path: '/new', component: NewTask },
        { path: '/task/:id', component: TaskItem },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

