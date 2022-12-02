const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   proxy: {
  //     'https://localhost:8080/': { target: 'https://freelance-fbf64-default-rtdb.firebaseio.com/tasks.json', secure: false },
  //
  //   },
  // },

})
