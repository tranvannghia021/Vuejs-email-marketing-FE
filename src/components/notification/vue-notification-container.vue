<template>
	<div class="notification-container">
		<transition-group
			name="notification"
			tag="ul">
			<vue-notification-bar
				v-for="notification in notifications"
				:notification="notification"
				:key="notification.id" />
		</transition-group>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import VueNotificationBar from './vue-notification-bar.vue';
	export default {
		name: 'VueNotificationContainer',
		components: {
			VueNotificationBar,
		},
		data() {
			return {};
		},
		computed: {
			...mapState('notification', ['notifications']),
		},
	};
</script>

<style lang="scss" scoped>
	.notification-container {
		position: fixed;
		top: 10px;
		right: 0;
		padding-right: 10px;
		z-index: 11111;
	}
	.notification-enter-active,
	.notification-leave-active {
		transition: all 0.3s;
	}
	.notification-enter, .notification-leave-to /* .list-leave-active below version 2.1.8 */ {
		opacity: 0;
		transform: translateX(30px);
	}
</style>
