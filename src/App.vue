<template>
	<div id="app">
		<template>
			<vue-extend-layouts />
			<vue-notification-container />
		</template>
	</div>
</template>

<script>
	import VueExtendLayouts from 'vue-extend-layout';

	import VueNotificationContainer from '@/components/notification/vue-notification-container.vue';
	import { mapState } from 'vuex';

	export default {
		name: 'App',
		components: { VueExtendLayouts, VueNotificationContainer },
	};
</script>
<style lang="scss" scoped></style>
