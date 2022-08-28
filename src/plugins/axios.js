import { default as instance } from 'axios';
import cookie from '@/plugins/cookie';
import store from '@/store';
import NProgress from './nprogress';
import router from '@/router';

let axios = instance.create({
	baseURL: process.env.VUE_APP_API,
	timeout: 60 * 1000, // 60 seconds
	crossDomain: true,
	preflightContinue: true,
	headers: {
		'Content-Type': 'application/json',
	},
	// validateStatus: function (status) {
	// 	return status >= 200 && status < 400;
	// },
});
axios.CancelToken = instance.CancelToken;
axios.isCancel = instance.isCancel;
axios.interceptors.request.use(
	function (config) {
		NProgress.start();
		let token = cookie.get('access_token');
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		} else {
			delete config.headers['Authorization'];
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
axios.interceptors.response.use(
	async function (response) {
		NProgress.done();
		const config = response.config;
		if (
			config.url.indexOf('/auth/login') >= 0 ||
			config.url.indexOf('/auth/verify') >= 0
		) {
			return response;
		}
		// CHECK TOKEN EXPIRE, AUTO REFRESH TOKEN
		const { message, status } = response.data;
		if (status && status === 401) {
			if (message === 'Token Expired') {
				const { success, access_token } = await store.dispatch(
					'auth/refresh'
				);
				if (success) {
					config.headers['Authorization'] = `Bearer ${access_token}`;
					store.commit('auth/SET_TOKEN', access_token);

					return axios(config);
				}
			}

			store.commit('auth/REMOVE_USER');
			store.commit('auth/REMOVE_TOKEN');
			store.dispatch('notification/add', {
				type: 'error',
				message: 'Server error. Try again!!',
			});
			router.push({
				name: 'Login',
			});
		}

		return response;
	},
	async function (error) {
		NProgress.done();
		if (
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			store.commit('auth/REMOVE_USER');
			store.commit('auth/REMOVE_TOKEN');
			router.push({
				name: 'Login',
			});
		}
		if (error.code === 'ERR_NETWORK') {
			router.push({
				name: 'NetworkIssue',
			});
			store.dispatch('notification/add', {
				type: 'error',
				message: error.message,
			});
			return Promise.reject();
		}
		return Promise.reject(error.response);
	}
);
export default axios;
