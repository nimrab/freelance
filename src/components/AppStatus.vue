<template>
  <span :class="['badge', statusClass]">{{status}}</span>
</template>

<script>
import {computed} from 'vue'

export default {
  props: ['type'],
  setup(props) {

    const statusTypes = {
      active: {text:'Активен', class: 'primary'},
      done: {text:'Завершен', class: 'primary'},
      cancelled: {text:'Отменен', class: 'danger'},
      pending: {text:'Выполняестся', class: 'warning'},
    }

  const status = computed(()=> {
    return statusTypes[props.type].text
  })

  const statusClass = computed(()=> {
    return statusTypes[props.type].class
  })

    return {
      status,
      statusClass,
    }
  }
}


</script>
