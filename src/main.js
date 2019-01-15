import Vue from 'vue'
import App from './App.vue'
import router from './routes/routes.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  useEslint : false,
  router,
  render: h => h(App),
}).$mount('#app')
