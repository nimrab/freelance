<template>
<h1
  v-if="isEmptyTasks"
  class="text-white center"
>Задач пока нет</h1>
<h3
  v-if="tasks.length"
  class="text-white"
    >Всего активных задач: {{activeTasksCount}}</h3>
<template
  v-for="task in tasks"
  :key="task.id"
>
  <div class="card">
    <h2 class="card-title">
        {{task.title}}
    </h2>
    <p>
      <strong>
        <small>
          Статус: <AppStatus :type="task.status" />
        </small>
      </strong>
    </p>
    <p>
      <strong>
        <small>
          Дэдлайн: {{task.deadline}}
        </small>
      </strong>
    </p>
    <p>
      <strong>
        <small>
          Описание: {{task.description}}
        </small>
      </strong>
    </p>
    <button
      @click="showTaskItem( task.id )"
      class="btn primary"
    >Посмотреть</button>
  </div>
</template>
</template>

<script>
import AppStatus from '@/components/AppStatus'
import {onMounted, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'


export default {
  components: {AppStatus},
  setup() {

    const router = useRouter()
    // const route = useRoute()
    const store = useStore()

    const tasksCount = computed(() => {
      return store.getters.tasksArr
    } )

    const tasks = computed(() => {
      return store.getters.tasksArr
    })

    const isEmptyTasks = computed(() => {
      return !store.getters.tasksArr
    })

    const activeTasksCount = computed(()=>{
      return store.getters.tasksArr.filter(({status})=> status === 'active' || status === 'pending' ).length
    })

    const isLoading = computed(()=>{
      return store.getters.isLoading
    })

    function showTaskItem(id) {
      router.push(`/task/${id}`)
    }

    function fetchTasks() {
      store.dispatch('fetchTasks')
    }

    onMounted(()=> {
      fetchTasks()
    })

    return {
      tasks,
      tasksCount,
      isEmptyTasks,
      showTaskItem,
      activeTasksCount,
      isLoading,
    }
  }
}
</script>
<style>
h2 {
  color: black;
}
</style>
