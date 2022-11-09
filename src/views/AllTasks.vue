<template>
  <h1 class="text-white center">Задач пока нет</h1>
  <h2>{{tasks}}</h2>
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
import {ref} from 'vue'

export default {
  components: {AppStatus},
  setup() {

    const tasks = ref([
      {name: 'task1', status: 'done'},
    ])

    return {
      tasks,
    }
  }
}
</script>
<style>
h2 {
  color: black;
}
</style>
