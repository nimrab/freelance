import {createStore} from 'vuex'
// import axios from 'axios'

export const store = createStore({
  state() {
    return {
      // apiUrl: `https://freelance-fbf64-default-rtdb.firebaseio.com/tasks.json`,
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
    setTasks(state, newTasks) {
      state.tasks = [...newTasks]
    },
    setLoading(state, status) {
      state.isLoading = status
    },
  },

  actions: {
    // async createTask({state, commit}, task ) {
    //   const payload = {...task, status: 'active'}
    //   try {
    //     await axios.post( state.apiUrl, payload )
    //
    //     commit('addTask', payload)
    //   } catch (e) {
    //     console.log(e)
    //   }

    createTask({state,commit}, newTask ) {
      commit('setLoading', true)
      localStorage.setItem('tasks', JSON.stringify([...state.tasks, newTask]))
      commit('addTask', newTask)
      setTimeout(()=> {
        commit('setLoading', false)
      }, 1000)
    },

    // async fetchTasks({state, commit}) {
    //   commit('setLoading', true)
    //   try {
    //     const response = await axios.get(state.apiUrl)
    //     if (response.data) {
    //       const dataArr = Object.entries(response.data)
    //         .reduce((acc, [id, {title,description,deadline,status}]) => {
    //           return [...acc, {id, title, description, deadline, status}]
    //         }, [] )
    //       commit('setFetchedData', dataArr)
    //     }
    //   } catch(e) {
    //     console.log(e)
    //   }
    //   finally {
    //     commit('setLoading', false)
    //   }
    // },

    fetchTasks({commit}) {
      commit('setLoading', true)

      const tasks = JSON.parse(localStorage.getItem('tasks'))
      if ( tasks ) {
        commit('setTasks', tasks)
      }
      setTimeout(()=> {
        commit('setLoading', false)
      }, 1000)

    },

    // async changeTaskStatus({state, commit}, { id, status }) {
    //   commit('setLoading', true)
    //   try {
    //     const task = state.tasks.find(el => el.id===id )
    //
    //     if (task) {
    //       task.status = status
    //       await axios.patch( `${state.apiUrl}/${id}/status`, status )
    //     }
    //
    //   } catch(e) {
    //     console.log(e)
    //   } finally {
    //   commit('setLoading', false)
    //   }
    // }

    changeTask({state, commit}, newTask) {
      commit('setLoading', true)
      const filteredTasks = state.tasks.map(el => el.id === newTask.id ? {...newTask} : el)
      localStorage.setItem('tasks', JSON.stringify(filteredTasks))
      commit('setTasks', filteredTasks)
      setTimeout(()=> {
        commit('setLoading', false)
      }, 1000)
    },

    deleteTask({state, commit}, id) {
      commit('setLoading', true)
      const filteredTasks = state.tasks.filter( el => el.id !== id )
      localStorage.setItem('tasks', JSON.stringify(filteredTasks))
      commit('setTasks', filteredTasks)
      setTimeout(()=> {
        commit('setLoading', false)
      }, 1000)
    },
  }
})
