import axios from './axios';
const api = {
	get(url, params = {}, cancel_token = null) {
		return new Promise((resolve, reject) => {
			axios
				.get(url, {
					params,
					cancelToken: cancel_token ? cancel_token.token : null,
				})
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					if (axios.isCancel(err)) {
						return reject('canceled');
					}
					reject(err);
				});
		});
	},

	post(url, data = {}, options = {}) {
		return new Promise((resolve, reject) => {
			axios
				.post(url, data, options)
				.then((res) => {
					resolve(res.data);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},

	put(url, data = {}) {},

	delete(url, data = {}) {},
};

export default {
	AUTH: {
		login(payload) {
			return api.get('/auth/login', payload);
		},
		verify(payload) {
			return api.post('/auth/login/verify', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		refreshToken() {
			return api.post('/auth/refresh');
		},
		logout() {
			return api.post('/auth/logout');
		},
		fetchUser() {
			return api.post('/auth/shop-info');
		},
	},

	CUSTOMER: {
		loadCustomer() {
			return api.get('/mannal-sync');
		},
		getCustomer(payload) {
			return api.get('/customer', payload);
		},
		exportCSV(payload) {
			return api.post('/export-csv', payload);
		},
	},

	CAMPAIGN: {
		getCampaign() {
			return api.get('/campaign/list');
		},
		createNewCampaign(payload) {
			return api.post('/campaign/create', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		SendTest(payload) {
			return api.post('/campaign/experiment', payload, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
	},
};
