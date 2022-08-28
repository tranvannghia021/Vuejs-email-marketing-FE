import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth';
import campaign from './campaign';
import * as notification from './notification';
import * as customer from './customer';

export default new Vuex.Store({
	state: {
		is_show_sidebar: true,
	},
	getters: {},
	mutations: {
		TOGGLE_SIDEBAR(state) {
			state.is_show_sidebar = !state.is_show_sidebar;
		},
	},
	actions: {},
	modules: {
		auth,
		campaign,
		notification,
		customer,
	},
});
