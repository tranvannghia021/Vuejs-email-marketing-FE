import Vue from 'vue';
import App from './App.vue';
import './styles/scss/index.scss';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';
Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
