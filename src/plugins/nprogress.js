import NProgress from 'nprogress';

NProgress.configure({
	showSpinner: false,
	minimum: 0.3,
	easing: 'ease',
	speed: 100,
});

export default NProgress;
