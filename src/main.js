import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes.js'

Vue.config.productionTip = false

new Vue({
  useEslint : false,
  router,
  render: h => h(App),
}).$mount('#app')
