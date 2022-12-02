import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
  state() {
    return {
      apiUrl: `https://freelance-fbf64-default-rtdb.firebaseio.com/tasks.json`,
      tasks: [],
      isLoading: false,
    }
  },

  getters: {
    tasksArr(state) {
      return state.tasks
    },
    taskItem: ({tasks}) => (id) => {
      return tasks.find( t => t.id === id ) ?? {}
    },
    isLoading({isLoading}) {
      return isLoading
    }
  },

  mutations: {
    addTask({tasks}, task) {
      tasks.push( task )
    },
    setFetchedData(state, taskArr) {
      state.tasks = [...taskArr]
    },
    setLoading(state, status) {
      state.isLoading = status
    },
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
      commit('setLoading', true)
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
        console.log(e)
      }
      finally {
        commit('setLoading', false)
      }
    },

    async changeTaskStatus({state, commit}, { id, status }) {
      commit('setLoading', true)
      try {
        const task = state.tasks.find(el => el.id===id )

        if (task) {
          task.status = status
          await axios.patch( `${state.apiUrl}/${id}/status`, status )
        }

      } catch(e) {
        console.log(e)
      } finally {
      commit('setLoading', false)
}
    }

  }
})
