<template>
	<div class="bar">
		<div class="flex flex-gap-10">
			<vue-button
				@clicked="backHomeCampagin"
				class="btn-outline btn-back">
				<template slot="button-icon">
					<svg
						width="8"
						height="16"
						viewBox="0 0 8 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.21875 13.8125L7.84375 13.2188C7.96875 13.0625 7.96875 12.8125 7.84375 12.6875L2.1875 7L7.84375 1.34375C7.96875 1.21875 7.96875 0.96875 7.84375 0.8125L7.21875 0.21875C7.0625 0.0625 6.84375 0.0625 6.6875 0.21875L0.125 6.75C0 6.90625 0 7.125 0.125 7.28125L6.6875 13.8125C6.84375 13.9688 7.0625 13.9688 7.21875 13.8125Z"
							fill="#555770" />
					</svg>
				</template>
			</vue-button>
			Create new campaign
		</div>
		<div class="flex flex-gap-16">
			<vue-button
				@clicked="backHomeCampagin"
				class="btn-outline btn-cancel">
				Cancel
			</vue-button>
			<vue-button
				:is_loading="is_loading"
				@clicked="handleSave"
				class="btn-primary btn-save">
				Save
			</vue-button>
		</div>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import { mapActions, mapState } from 'vuex';
	import mixins from '@/plugins/mixins';

	export default {
		name: 'campaign-navigator',
		components: {
			'vue-button': VueButton,
		},
		mixins: [mixins],
		computed: {
			...mapState('campaign', ['is_loading']),
		},
		methods: {
			...mapActions({
				saveNewCampaign: 'campaign/saveNewCampaign',
			}),
			handleSave() {
				this.$emit('eventSaveCampaignOnNav');
			},
		},
	};
</script>

<style lang="scss" scoped>
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 17px 20px 17px 30px;
		background-color: $light-4-color;
		// margin-top: 1px;
		font-weight: 500;
		font-size: 1.8rem;
		line-height: 22px;
		color: $dark-1-color;
	}

	.btn-cancel {
		padding: 4px 20px;
		line-height: 22px;
	}

	.btn-save {
		padding: 4px 28px;
		line-height: 24px;
	}

	.btn-back {
		padding: 7px 11px;
	}
</style>
