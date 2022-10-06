import Vue from 'vue'
import App from './App'




import  api  from 'utils/request/api.js'
import  meapi  from 'utils/request/me_api.js'
import  medapi  from 'utils/request/medapi.js'
import  dataTime  from 'utils/time.js'
Vue.prototype.$api = api
Vue.prototype.$meapi = meapi
Vue.prototype.$medapi = medapi
Vue.prototype.$dataTime = dataTime

	//Vue.prototype.$baseUrl = "https://api.fenxbangong.com/"
	Vue.prototype.$baseUrl = "/"
 


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()