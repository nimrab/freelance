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
      @click.prevent="createTask"
    >Создать</button>
  </form>
</template>


<script>
import {ref} from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const taskName = ref('')
    const taskDescription = ref('')
    const taskDeadline = ref('')
    const store=useStore()

    const createTask = () => {
      const payload = {
        title: taskName.value,
        description: taskDescription.value,
        deadline: taskDeadline.value,
      }
      store.dispatch( 'createTask', payload )
    }
    return {
      taskName,
      taskDescription,
      taskDeadline,
      createTask,
    }
  }

}


</script>
