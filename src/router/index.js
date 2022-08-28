import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import Auth from '@/middlewares/auth';
import NoLogin from '@/middlewares/noLogin';
Vue.use(VueRouter);

const DEFAULT_TITLE = 'Email Marketing';

const routes = [
	{
		path: '/',
		name: 'Customer',
		alias: '/customer',
		meta: {
			middleware: [Auth],
			title: 'Customer Page',
		},
		component: () =>
			import(
				/* webpackChunkName: "customer" */ '@/modules/customer/views/index.vue'
			),
	},
	{
		path: '/campaign',
		component: () =>
			import(
				/* webpackChunkName: "campaign" */ '@/modules/campaign/views/layout.vue'
			),

		children: [
			{
				path: '',
				name: 'Campaign',
				meta: {
					middleware: [Auth],
					title: 'Campaign Page',
				},
				component: () =>
					import(
						/* webpackChunkName: "campaign" */ '@/modules/campaign/views/index.vue'
					),
			},
			{
				path: 'create',
				name: 'CreateCampaign',
				meta: {
					middleware: [Auth],
					title: 'Campaign Create Page',
				},
				component: () =>
					import(
						/* webpackChunkName: "campaign" */ '@/modules/campaign/views/create.vue'
					),
			},
		],
	},

	{
		path: '/auth/login',
		name: 'Login',
		meta: {
			middleware: [NoLogin],
			layout: 'auth',
			title: 'Login Page',
		},
		component: () =>
			import(
				/* webpackChunkName: "login" */ '@/modules/auth/views/login.vue'
			),
	},
	{
		path: '/404',
		name: '404',
		meta: {
			layout: 'page-not-found',
			title: 'Page Not Found',
		},
		component: () =>
			import(
				/* webpackChunkName: "pagenotfound" */ '@/components/vue-page-not-found.vue'
			),
		props: true,
	},
	{
		path: '/network-issue',
		name: 'NetworkIssue',
		meta: {
			layout: 'page-not-found',
			title: 'Network Issue',
		},
		component: () =>
			import(
				/* webpackChunkName: "pagenotfound" */ '@/components/vue-network-issue.vue'
			),
	},
	{
		path: '*',
		redirect: {
			name: '404',
			params: {
				resource: 'page',
			},
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: '/',
	routes,
	scrollBehavior: function (to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
});

const emptyFn = () => {};
const originalPush = router.push;
router.push = function push(location, onComplete = emptyFn, onAbort = emptyFn) {
	return originalPush.call(this, location, onComplete, onAbort);
};
router.beforeEach(async (to, from, next) => {
	if (to.meta.middleware) {
		const middlewares = to.meta.middleware;
		const payload = { to, from, next, store };
		let preventNext = false;
		for (let i = 0; i < middlewares.length; i++) {
			const result = await middlewares[i](payload);
			if (!result) {
				preventNext = true;
				break;
			}
		}
		if (preventNext) {
			return;
		}
	}
	next();
});
router.afterEach((to, from) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || DEFAULT_TITLE;
	});
});
export default router;
