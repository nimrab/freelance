<template>
  <div
      v-if="isLoading"
      class="loader"
  ></div>
  <div v-else>
    <h1
        v-if="isEmptyTasks"
        class="text-white center"
    >Задач пока нет</h1>
    <h3
        v-if="isShowActiveTasks"
        class="text-white"
    >Всего активных задач: {{ activeTasksCount }}</h3>
    <div class="filters">
      <div class="search">
        <div class="search-text">Поиск:</div>
        <input
            v-model="inputText"
            placeholder="Введите текст для поиска"
            class="search-input form-control"
        >
      </div>
      <div class="status-select">
        <div class="status-select-text">Статус:</div>
        <select
            v-model="selectValue"
            class="select-input form-control"
        >
          <option
              v-for="option in selectOptions"
              :key="option.value"
              :value="option.value"
          >{{ option.option }}
          </option>
        </select>
      </div>
    </div>


    <template
        v-for="task in tasks"
        :key="task.id"
    >
      <div class="card">
        <div class="title-wrapper">
          <h2 class="card-title">
            {{ task.title }}
          </h2>
          <AppStatus :type="task.status"/>
        </div>
        <div class="deadline">
          <strong>
            <small>{{ task.deadline }}</small>
          </strong>
        </div>
        <button
            @click="showTaskItem( task.id )"
            class="btn primary"
        >Посмотреть
        </button>
        <button
            @click="deleteTaskItem( task.id )"
            class="btn danger"
        >Удалить
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import AppStatus from '@/components/AppStatus'
import {onMounted, computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  components: {AppStatus},
  setup() {

    const router = useRouter()
    const store = useStore()
    const selectOptions = [
      {option: 'Все', value: 'all'},
      {option: 'Активен', value: 'active'},
      {option: 'Завершен', value: 'done'},
      {option: 'Отменен', value: 'cancelled'},
      {option: 'Выполняестся', value: 'pending'},
    ]
    const inputText = ref('')
    const selectValue = ref('all')

    const tasksCount = computed(() => {
      return store.getters.tasksArr
    })

    const tasks = computed(() => {
      switch (true) {
        case inputText.value && selectValue.value === 'all':
          return store.getters.tasksArr.filter(el => el.title.toLowerCase().includes(inputText.value.toLowerCase()))
        case inputText.value && selectValue.value !== 'all':
          return store.getters.tasksArr.filter(el => el.title.toLowerCase().includes(inputText.value.toLowerCase())
              && el.status === selectValue.value)
        case !inputText.value && selectValue.value !== 'all':
          return store.getters.tasksArr.filter(el => el.status === selectValue.value)
        default:
          return store.getters.tasksArr
      }
    })

    const isEmptyTasks = computed(() => {
      return !store.getters.tasksArr.length
    })

    const activeTasksCount = computed(() => {
      return store.getters.tasksArr.filter(({status}) => status === 'active' || status === 'pending').length
    })

    const isLoading = computed(() => {
      return store.getters.isLoading
    })

    const isShowActiveTasks = computed(() => {
      return tasks.value.length || inputText || selectValue.value !== 'all'
    })

    function showTaskItem(id) {
      router.push(`/task/${id}`)
    }

    function deleteTaskItem(id) {
      store.dispatch('deleteTask', id)
    }

    function fetchTasks() {
      store.dispatch('fetchTasks')
    }

    onMounted(() => {
      fetchTasks()
    })

    return {
      tasks,
      tasksCount,
      isEmptyTasks,
      showTaskItem,
      deleteTaskItem,
      activeTasksCount,
      isLoading,
      inputText,
      selectOptions,
      selectValue,
      isShowActiveTasks,
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

.search {
  display: flex;
  margin-bottom: 20px;
}

.search-text {
  color: #fff;
  margin-top: 5px;
}

.search-input {
  margin-left: 15px;
  width: 200px;
  height: 30px;
}

.filters {
  display: flex;
  justify-content: space-between;
}
</style>
