export const namespaced = true;

export const state = {
	notifications: [],
};
let nextId = 1;
export const mutations = {
	UPDATE(state, notifications) {
		state.notifications = notifications;
	},
};

export const actions = {
	add({ commit, state }, notification) {
		const notifications = [
			...state.notifications,
			{
				...notification,
				id: nextId++,
			},
		];
		commit('UPDATE', notifications);
	},
	delete({ commit, state }, notificationId) {
		const notifications = state.notifications.filter(
			(notification) => notification.id !== notificationId
		);
		commit('UPDATE', notifications);
	},
};
