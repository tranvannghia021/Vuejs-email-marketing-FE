<template>
	<div class="vue-layout-default">
		<vue-sidebar />
		<div class="vue-layout-default-content">
			<vue-header />
			<router-view :key="$route.fullPath" />
		</div>
	</div>
</template>
<script>
	import VueSidebar from './partials/vue-sidebar.vue';
	import VueHeader from './partials/vue-header.vue';
	import pusher from '@/plugins/pusher';
	import { mapState, mapMutations } from 'vuex';
	export default {
		name: 'LayoutDefault',
		components: {
			VueSidebar,
			VueHeader,
		},
		data() {
			return {
				mock_customer: null,
				chanel: null,
			};
		},
		computed: {
			...mapState('customer', ['percent', 'is_progress_loading']),
			...mapState('auth', ['loaded', 'user']),
			...mapState('campaign', ['campaigns']),
		},
		watch: {
			// WATCH LOADING CUSTOMER
			mock_customer: {
				handler: function (value) {
					let pc = Math.floor((value.sended / value.total) * 100);
					if (value.sended === 0 && value.total === 0) {
						pc = 100;
					}
					this.$store.dispatch('customer/add_percent', pc);
				},
				deep: true,
			},
			// WATCH PERCENT LOADING
			percent() {
				if (this.percent === 100) {
					this.$store.commit('customer/SET_PROGRESS_LOADING', false);
				}
			},
		},
		methods: {
			...mapMutations({
				setProgress: 'campaign/SET_PROGRESS_COMPAIGN',
			}),
			// SUBSCRIBE PUSHER
			subscribe() {
				this.chanel = pusher.subscribe(`load_customer_${this.user.id}`);
				let message = pusher.subscribe(`load_message_${this.user.id}`);
				let chanel_campaign = pusher.subscribe(
					`load_campaign_${this.user.id}`
				);
				this.chanel.bind(`add_customer_${this.user.id}`, (data) => {
					this.progress_percent_customer(data);
				});
				message.bind(`add_message_${this.user.id}`, (data) => {
					this.listen_message_status(data);
				});
				chanel_campaign.bind(`add_campaign_${this.user.id}`, (data) => {
					this.setProgress(data);
				});
			},
			// HANDLE SHOW/HIDE PROGRESS PERCENT LOADING CUSTOMER
			progress_percent_customer(data) {
				if (!this.is_progress_loading) {
					this.$store.commit('customer/SET_SYNC_LOADING', false);
					this.$store.commit('customer/SET_PROGRESS_LOADING', true);
				}

				this.mock_customer = data;
			},
			// SHOW MESSAGE FROM RESPONSE OF PUSHER
			listen_message_status(data) {
				const { success, message } = data;
				this.$store.commit('customer/SET_EXPORT_LOADING', false);

				this.$store.dispatch('notification/add', {
					type: success ? 'success' : 'error',
					message,
				});
			},
		},
		created() {
			if (!this.loaded) {
				this.$store.commit('customer/SET_SYNC_LOADING', true);
			}
			this.subscribe();
		},
		beforeDestroy() {
			// DISCONNECT PUSHER
			pusher.disconnect();
		},
	};
</script>
<style lang="scss" scoped>
	.vue-layout-default {
		display: flex;
		height: 100vh;
		position: relative;

		&-content {
			flex: 1;
			display: flex;
			flex-direction: column;
			background-color: $light-2-color;
			overflow: hidden;
		}
	}
</style>
