<template>
  <h1
    v-if="isEmptyTasks"
    class="text-white center"
  >Задач пока нет</h1>
  <h3
    v-if="tasks.length"
    class="text-white"
      >Всего активных задач: {{tasks.length}}</h3>
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
    const storeTasks = store.getters.tasksArr

    const tasksCount = computed(() => {
      return storeTasks.length
    } )

    const tasks = computed(() => {
      return storeTasks
    })

    const isEmptyTasks = computed(() => {
      return !!storeTasks.length
    })

    function showTaskItem(id) {
      router.push(`/task/${id}`)
    }

    onMounted(()=> {
      store.dispatch('fetchTasks')
    })

    return {
      tasks,
      tasksCount,
      isEmptyTasks,
      showTaskItem,
    }
  }
}
</script>
<style>
h2 {
  color: black;
}
</style>
