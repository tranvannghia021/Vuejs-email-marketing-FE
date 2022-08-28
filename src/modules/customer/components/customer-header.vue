<template>
	<div class="vue-customer-header">
		<h3 class="vue-customer-header-title">Customer</h3>
		<vue-button
			class="btn-outline"
			@clicked="handle_export_csv"
			:disabled="
				is_export_loading || is_progress_loading || sync_loading
			">
			<svg
				:class="{ 'vue-customer-header-export': is_export_loading }"
				slot="button-icon"
				width="11"
				height="13"
				viewBox="0 0 11 13"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9.875 11.125H1.09766C0.632812 11.125 0.25 11.5352 0.25 12C0.25 12.4375 0.632812 12.875 1.09766 12.875H9.875C10.3398 12.875 10.75 12.4922 10.75 12C10.75 11.5352 10.3398 11.125 9.875 11.125ZM9.21875 5.02734H7.25V1.52734C7.25 1.03516 6.83984 0.652344 6.375 0.652344H4.625C4.13281 0.652344 3.75 1.03516 3.75 1.52734V5.02734H1.78125C1.50781 5.02734 1.26172 5.16406 1.15234 5.41016C1.07031 5.65625 1.09766 5.92969 1.28906 6.12109L5.00781 10.0586C5.25391 10.332 5.71875 10.332 5.96484 10.0586L9.68359 6.12109C9.875 5.92969 9.90234 5.65625 9.82031 5.41016C9.71094 5.16406 9.46484 5.02734 9.21875 5.02734Z"
					fill="currentColor" />
			</svg>

			Export CSV
		</vue-button>
		<vue-button
			class="btn-primary"
			:disabled="is_progress_loading || sync_loading"
			@clicked="handle_sync_customer">
			<svg
				:class="{ 'vue-customer-header-loading': sync_loading }"
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12.2773 0.84375L10.9648 2.18359C9.89844 1.22656 8.50391 0.625 7 0.625C4.40234 0.625 2.13281 2.29297 1.33984 4.75391C1.20312 5.21875 1.44922 5.71094 1.91406 5.84766C2.37891 5.98438 2.87109 5.73828 3.00781 5.27344C3.55469 3.55078 5.16797 2.375 7 2.375C8.01172 2.375 8.99609 2.78516 9.73438 3.41406L8.50391 4.61719C8.06641 5.08203 8.36719 5.875 9.02344 5.875H13.043C13.3164 5.875 13.5625 5.65625 13.5625 5.35547V1.39062C13.5625 0.707031 12.7422 0.378906 12.2773 0.84375ZM12.0586 7.67969C11.5938 7.54297 11.1016 7.78906 10.9648 8.25391C10.418 9.97656 8.80469 11.125 7 11.125C5.96094 11.125 5.00391 10.7422 4.23828 10.1133L5.46875 8.88281C5.90625 8.44531 5.60547 7.65234 4.94922 7.625H0.929688C0.65625 7.65234 0.4375 7.87109 0.4375 8.17188V12.1367C0.4375 12.8203 1.23047 13.1484 1.69531 12.6836L3.00781 11.3438C4.07422 12.3008 5.46875 12.875 6.97266 12.875C9.54297 12.875 11.8125 11.2344 12.6055 8.77344C12.7695 8.30859 12.5234 7.81641 12.0586 7.67969Z"
					fill="currentColor" />
			</svg>

			Manual sync
		</vue-button>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import { mapActions, mapMutations, mapState } from 'vuex';
	export default {
		name: 'CustomerHeader',
		components: {
			VueButton,
		},
		data() {
			return {};
		},
		computed: {
			...mapState('customer', [
				'is_progress_loading',
				'sync_loading',
				'selected',
				'is_export_loading',
			]),
		},
		methods: {
			...mapMutations('customer', ['SET_EXPORT_LOADING']),
			...mapActions('customer', [
				'add_percent',
				'sync_customer',
				'export_csv',
			]),
			// CALL API SYNC CUSTOMER
			async handle_sync_customer() {
				try {
					const { success, message } = await this.sync_customer();
					if (success) {
						this.$store.dispatch('notification/add', {
							type: 'success',
							message,
						});
					}
				} catch (error) {
					console.log(error);
				}
			},
			// HANDLE CALL API EXPORT CSV
			async handle_export_csv() {
				try {
					this.SET_EXPORT_LOADING(true);
					const { success, message } = await this.export_csv({
						customers: this.selected,
					});
					if (success) {
						this.$store.dispatch('notification/add', {
							type: 'success',
							message,
						});
					}
				} catch (error) {
					this.SET_EXPORT_LOADING(false);
					this.$store.dispatch('notification/add', {
						type: 'error',
						message: 'Server error!',
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.vue-customer-header {
		display: flex;
		align-items: center;
		column-gap: 10px;

		&-title {
			margin-right: auto;
			font-size: 2rem;
			font-weight: 800;
			line-height: 2.4rem;
		}

		&-loading {
			animation: spin 1s ease-in-out infinite;
		}

		&-export {
			animation: down 1s ease-in-out infinite;
		}
	}
</style>
