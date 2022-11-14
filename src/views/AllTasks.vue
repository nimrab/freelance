<template>
  <h1 class="text-white center">Задач пока нет</h1>
  <h2>{{storeTasks}}</h2>
  <template>
    <h3 class="text-white">Всего активных задач: 0</h3>
    <div class="card">
      <h2 class="card-title">
        Название задачи
        <AppStatus :type="'done'" />
      </h2>
      <p>
        <strong>
          <small>
            {{new Date().toLocaleDateString()}}
          </small>
        </strong>
      </p>
      <button class="btn primary">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '@/components/AppStatus'
import {ref, onMounted} from 'vue'
// import {useRoute, useRouter} from "vue-router";
import {useStore} from 'vuex'

export default {
  components: {AppStatus},
  setup() {

    // const router = useRouter()
    // const route = useRoute()
    const store = useStore()


    const tasks = ref([
      {name: 'task1', status: 'done'},
    ])

    onMounted(()=> {
      store.dispatch('fetchTasks')
    })

    return {
      tasks,
      storeTasks: store.getters.tasksArr,
    }
  }
}
</script>
<style>
h2 {
  color: black;
}
</style>
