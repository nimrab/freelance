<template>
  <form class="card">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input
          v-model="taskName"
          type="text"
          id="title"
      >
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input
          v-model="taskDeadline"
          type="date"
          id="date"
      >
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea
          v-model="taskDescription"
          id="description"
      ></textarea>
    </div>

    <button
        class="btn primary"
        :disabled="isBtnDisabled"
        @click.prevent="createTask"
    >Создать
    </button>
  </form>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {v4 as uuidv4} from 'uuid'

export default {
  setup() {
    const taskName = ref('')
    const taskDescription = ref('')
    const taskDeadline = ref('')
    const store = useStore()
    const router = useRouter()

    const reverseDate = (value) => {
      return value.split('-').reverse().join('.')
    }

    const getDateFromString = () => {
      return new Date(
          +taskDeadline.value.slice(0, 4),
          +taskDeadline.value.slice(5, 7) - 1,
          +taskDeadline.value.slice(8, 10),
      ).setHours(0, 0, 0, 0)
    }

    const checkStatus = (dateEnd, today) => {
      return today > getDateFromString(dateEnd) ? 'cancelled' : 'active'
    }

    const createTask = () => {
      const payload = {
        id: uuidv4(),
        title: taskName.value,
        description: taskDescription.value,
        deadline: reverseDate(taskDeadline.value),
        status: checkStatus(getDateFromString(), new Date().setHours(0, 0, 0, 0)),
      }
      store.dispatch('createTask', payload)
      router.push('/')
    }

    const isBtnDisabled = computed(() => {
      return !taskName.value || !taskDescription.value || !taskDeadline.value
    })

    return {
      taskName,
      taskDescription,
      taskDeadline,
      isBtnDisabled,
      createTask,
    }
  }
}
</script>
