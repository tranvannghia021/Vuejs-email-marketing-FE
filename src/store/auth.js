import api from '@/plugins/api';
import cookie from '@/plugins/cookie';
import messageServerError from '@/utils/messageServerError';
let token = cookie.get('access_token');

const state = {
	user: null,
	token: token ? token : '',
	loaded: true, // account did sync customer
};

const getters = {
	isLogged(state) {
		return state.user ? true : false;
	},
	getUser(state) {
		return state.user;
	},
	getToken(state) {
		return state.token;
	},
};

const mutations = {
	SET_USER(state, payload) {
		state.user = payload;
	},
	REMOVE_USER(state) {
		state.user = null;
	},
	SET_TOKEN(state, payload) {
		state.token = payload;
		cookie.set('access_token', payload, {
			expires: 1, // one day
		});
	},
	SET_LOADED(state, payload) {
		state.loaded = payload;
	},
	REMOVE_TOKEN(state) {
		state.token = '';
		cookie.remove('access_token');
	},
};

const actions = {
	login({}, payload) {
		return api.AUTH.login(payload);
	},
	async verify({ commit }, payload) {
		try {
			const res = await api.AUTH.verify(payload);
			const { success, access_token, loaded } = res;
			if (success && access_token) {
				commit('SET_TOKEN', access_token);
				commit('SET_LOADED', loaded);
			}
			return res;
		} catch (error) {
			if (error) {
				return error;
			}
		}
	},
	async fetchUser({ state, commit }, payload) {
		try {
			if (!state.token) {
				return;
			}
			let res = await api.AUTH.fetchUser();
			let { data } = res;
			if (data) {
				commit('SET_USER', data);
			}

			return res;
		} catch (error) {
			if (error) {
				commit('REMOVE_TOKEN');
				messageServerError();
				return error?.data
					? error.data
					: { success: false, message: 'Server error' };
			}
		}
	},
	async logout({ commit }) {
		try {
			const { success, message } = await api.AUTH.logout();
			if (success) {
				commit('REMOVE_USER');
				commit('REMOVE_TOKEN');
			}

			return { success: true, message: 'Logout successfully!' };
		} catch (error) {
			if (error) {
				console.error('logout actions:' + error);
				messageServerError();
				return error?.data
					? error.data
					: { success: false, message: 'Server error' };
			}
		}
	},
	async refresh({ commit }) {
		try {
			return await api.AUTH.refreshToken();
		} catch (error) {
			if (error) {
				console.error('refresh actions:' + error);
				messageServerError();
				return error;
			}
		}
	},
};

export default {
	state,
	mutations,
	getters,
	actions,
	namespaced: true,
};
