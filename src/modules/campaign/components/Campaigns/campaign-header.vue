<template>
	<div class="vue-campaign-header">
		<h3 class="vue-campaign-header-title">Campaign</h3>

		<vue-button
			:to="{ name: 'CreateCampaign' }"
			class="btn-primary">
			<template slot="button-icon">
				<svg
					width="13"
					height="18"
					viewBox="0 0 13 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12.1875 5.75C12.1875 6.24219 11.7773 6.65234 11.3125 6.65234H7.375V10.5898C7.375 11.0547 6.96484 11.4375 6.5 11.4375C6.00781 11.4375 5.625 11.0547 5.625 10.5898V6.65234H1.6875C1.19531 6.65234 0.8125 6.24219 0.8125 5.75C0.8125 5.28516 1.19531 4.90234 1.6875 4.90234H5.625V0.964844C5.625 0.472656 6.00781 0.0625 6.5 0.0625C6.96484 0.0625 7.375 0.472656 7.375 0.964844V4.90234H11.3125C11.7773 4.875 12.1875 5.28516 12.1875 5.75Z"
						fill="#ffffff" />
				</svg>
			</template>
			Create new campaign
		</vue-button>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	export default {
		name: 'CampaignHeader',
		components: {
			VueButton,
		},
	};
</script>

<style lang="scss" scoped>
	.vue-campaign-header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-title {
			margin-right: auto;
			font-size: 2rem;
			font-weight: 800;
			line-height: 2.4rem;
		}
	}
</style>
