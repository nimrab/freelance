import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
  state() {
    return {
      apiUrl: `https://freelance-fbf64-default-rtdb.firebaseio.com/tasks.json`,
      tasks: []
    }
  },

  getters: {
    tasksArr(state) {
      return state.tasks
    }
  },

  mutations: {
    addTask(state, task) {
      state.tasks.push( task )
    },
    setFetchedData(state, taskArr) {
      state.tasks = taskArr
    },
    resetTasks(state) {
      state.tasks = []
    }
  },

  actions: {
    async createTask({state, commit}, task ) {
      const payload = {...task, status: 'active'}
      try {
        await axios.post( state.apiUrl, payload )

        commit('addTask', payload)
      } catch (e) {
        console.log(e)
      }
    },

    async fetchTasks({state, commit}) {
      commit('resetTasks')
      try {
        const response = await axios.get(state.apiUrl)
        if (response.data) {
          const dataArr = Object.entries(response.data)
            .reduce((acc, [id, {title,description,deadline,status}]) => {
              return [...acc, {id, title, description, deadline, status}]
            }, [] )
          commit('setFetchedData', dataArr)
        }
      } catch(e) {
        console.log()
      }
    }

  }
})
