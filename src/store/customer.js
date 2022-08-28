import api from '@/plugins/api';
import messageServerError from '@/utils/messageServerError';

export const namespaced = true;

export const state = {
	percent: 0,
	is_progress_loading: false,
	sync_loading: false,
	fetch_loading: false,
	is_export_loading: false,
	customers: [],
	selected: [],
	page: 1,
	has_next: false,
	actions: {
		search: '',
		date: {
			from: '',
			to: '',
		},
		order: {
			from: '',
			to: '',
		},
		spent: {
			from: '',
			to: '',
		},
		sort: '',
	},
};
export const getters = {};
export const mutations = {
	ADD_PERCENT(state, payload) {
		state.percent = payload;
	},
	SET_PROGRESS_LOADING(state, payload) {
		state.is_progress_loading = payload;
	},
	SET_SYNC_LOADING(state, payload) {
		state.sync_loading = payload;
	},
	SET_FETCH_LOADING(state, payload) {
		state.fetch_loading = payload;
	},
	SET_EXPORT_LOADING(state, payload) {
		state.is_export_loading = payload;
	},
	SET_NEXT_BUTTON(state, payload) {
		state.has_next = payload;
	},
	SET_CUSTOMERS(state, payload) {
		state.customers = payload;
	},
	UPDATE_SELECTED(state, payload) {
		state.selected = payload;
	},
	SET_PAGE(state, payload) {
		state.page = payload;
	},
	UPDATE_ACTION(state, { action, key, value }) {
		switch (action) {
			case 'search':
			case 'sort':
				state.actions[action] = value;
				break;
			case 'date':
			case 'spent':
			case 'order':
				state.actions[action][key] = value;
				break;
		}
	},
	CLEAR_ACTION(state, { action }) {
		switch (action) {
			case 'sort':
				state.actions[action] = '';
				break;
			case 'date':
			case 'spent':
			case 'order':
				state.actions[action]['from'] = '';
				state.actions[action]['to'] = '';
				break;
		}
	},
};

export const actions = {
	add_percent({ commit, dispatch }, payload) {
		commit('SET_SYNC_LOADING', false);
		commit('SET_PROGRESS_LOADING', true);
		if (payload <= 100) {
			commit('ADD_PERCENT', payload);
		}
		if (payload === 100) {
			commit('SET_PROGRESS_LOADING', false);
			this.dispatch('notification/add', {
				type: 'success',
				message: 'Loaded customer successfully!',
			});
			dispatch('get_customer');
		}
	},
	// ACTION SYNC CUSTOMER FROM SHOPIFY STORE
	async sync_customer({ commit }) {
		try {
			commit('SET_SYNC_LOADING', true);
			const res = await api.CUSTOMER.loadCustomer();
			return res;
		} catch (error) {
			commit('SET_SYNC_LOADING', false);
			if (error) {
				messageServerError();
				return error;
			}
		}
	},
	// ACTION HANDLE GET CUSTOMER
	async get_customer({ state, commit }) {
		try {
			commit('SET_FETCH_LOADING', true);
			let limit = 15;
			const payload = {
				limit,
				page: state.page,
				q: state.actions.search ? state.actions.search : null,
				date_from: state.actions.date.from
					? state.actions.date.from
					: null,
				date_to: state.actions.date.to ? state.actions.date.to : null,
				spent_from:
					state.actions.spent.from || state.actions.spent.from === 0
						? state.actions.spent.from
						: null,
				spent_to:
					state.actions.spent.to || state.actions.spent.to === 0
						? state.actions.spent.to
						: null,
				order_from:
					state.actions.order.from || state.actions.order.from === 0
						? state.actions.order.from
						: null,
				order_to:
					state.actions.order.to || state.actions.order.to === 0
						? state.actions.order.to
						: null,
				sort: state.actions.sort ? state.actions.sort : null,
			};
			const res = await api.CUSTOMER.getCustomer(payload);
			if (res.success) {
				commit('SET_CUSTOMERS', res.data);
				commit('SET_NEXT_BUTTON', res.next_page_url ? true : false);
			}
			return res;
		} catch (error) {
			if (error) {
				messageServerError();
				console.log(error);
				return error;
			}
		} finally {
			commit('SET_FETCH_LOADING', false);
		}
	},
	// ACTION EXPORT CSV
	async export_csv({}, payload) {
		try {
			let customers =
				payload.customers.length === 0 ? null : payload.customers;
			const now = new Date();
			const timezone =
				now.getFullYear() +
				'-' +
				(now.getMonth() + 1) +
				'-' +
				now.getDate() +
				'-' +
				now.getHours() +
				':' +
				now.getMinutes() +
				':' +
				now.getSeconds();

			const res = await api.CUSTOMER.exportCSV({ customers, timezone });

			return res;
		} catch (error) {
			if (error) {
				messageServerError();
				return error;
			}
		}
	},
};
