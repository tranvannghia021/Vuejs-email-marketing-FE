export default async function ({ next, to, store }) {
	let token = store.getters['auth/getToken'];
	if (token) {
		let user = store.getters['auth/getUser'];
		if (!user) {
			try {
				const res = await store.dispatch('auth/fetchUser');
				if (res.success) {
					return true;
				} else {
					await store.dispatch('auth/logout');
					next({
						name: 'Login',
					});
					return false;
				}
			} catch (error) {
				if (error.status == 401) {
					await store.dispatch('auth/logout');
					next({
						name: 'Login',
					});
				}
				return false;
			}
		} else {
			return true;
		}
	}
	next({
		name: 'Login',
	});
	return false;
}
