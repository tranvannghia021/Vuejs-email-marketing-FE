import store from '@/store/index';

const messageServerError = () => {
	store.dispatch('notification/add', {
		type: 'error',
		message: 'Server error!!!',
	});
};

export default messageServerError;
