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
    <div class="title-wrapper">
      <h2 class="card-title">
        {{task.title}}
      </h2>
      <AppStatus :type="task.status" />
    </div>
    <div class="deadline">
      <strong>
        <small>{{task.deadline}}</small>
      </strong>
    </div>
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
      return !store.getters.tasksArr.length
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
<style scoped>
h2 {
  color: black;
}

.card-title, h2 {
  margin-bottom: 0;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaecef;
}

.deadline {
  margin-top: 20px;
}

.btn {
  margin-top: 20px;
}
</style>
