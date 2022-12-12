<template>
  <div
    v-if="computedTask.id"
    class="card"
  >
    <h2>{{computedTask.title}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="'done'" /></p>
    <p><strong>Дэдлайн</strong>: {{computedTask.deadline}}</p>
    <p><strong>Описание</strong>: {{computedTask.description}}</p>
    <div>
      <button
        class="btn"
        @click="changeStatus('pending')"
      >Взять в работу</button>
      <button
          class="btn primary"
          @click="changeStatus('done')"
          >Завершить</button>
      <button
          class="btn danger"
          @click="changeStatus('cancelled')"
      >Отменить</button>
    </div>
  </div>
  <div
    v-if="!computedTask.id"
    class="return-btn-block"
  >
    <h3 class="text-white center">
      Задача с ID "<strong>{{taskId}}</strong>" не найдена.
    </h3>
    <button
      class="btn primary"
      @click="returnToMain"
    >Вернуться на главную</button>
  </div>

</template>

<script>
import AppStatus from '@/components/AppStatus'
import {onMounted, computed, ref, reactive} from 'vue'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {router} from '@/router'

export default {
  components: {AppStatus},
  setup() {

    const route = useRoute()
    const store = useStore()
    const taskId = ref('')
    let task = reactive({
      id: '',
      title: '',
      status: '',
      deadline: '',
      description: '',
    })

    const computedTask = computed(()=> {
      return task
    })

    function setTaskValues() {
      const {id, title, status, deadline, description} = store.getters.taskItem(taskId.value)
      task.id = id
      task.title = title
      task.status = status
      task.deadline = deadline
      task.description = description
    }

    function setTask() {
      setTaskValues()

      if (!task.id) {
        store.dispatch('fetchTasks')
        setTaskValues()
      }
    }

    function returnToMain() {
      router.push('/')
    }

    function changeStatus( status ) {
      const newTask = {...task, status}
      store.dispatch('changeTask',  newTask)
    }


    onMounted(() => {
      taskId.value = route.params.id
      setTask()
    })


    return {
      computedTask,
      taskId,
      returnToMain,
      changeStatus,
    }
  }
}
</script>

<style scoped>
.return-btn-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
