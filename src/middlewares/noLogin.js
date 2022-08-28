export default async function ({ next, to, store }) {
	let token = store.getters['auth/getToken'];
	if (token) {
		next({
			name: 'Customer',
		});
		return false;
	}
	// WHEN HAS QUERY AUTO CALL API, GET TOKEN
	if (to.query && Object.keys(to.query).length !== 0) {
		const { success } = await store.dispatch('auth/verify', to.query);
		if (success) {
			next({
				name: 'Customer',
			});
			store.dispatch('notification/add', {
				type: 'success',
				message: 'Login successfully!',
			});
			return false;
		}
	}

	return true;
}
