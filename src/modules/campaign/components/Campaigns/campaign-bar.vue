<template>
	<div class="campaign-bar">
		<div class="campaign-bar-search">
			<svg
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M13.7812 13.6289L10.1172 9.96484C10.9102 9.00781 11.3477 7.77734 11.3477 6.4375C11.3477 3.32031 8.77734 0.75 5.66016 0.75C2.51562 0.75 0 3.32031 0 6.4375C0 9.58203 2.54297 12.125 5.66016 12.125C6.97266 12.125 8.20312 11.6875 9.1875 10.8945L12.8516 14.5586C12.9883 14.6953 13.1523 14.75 13.3438 14.75C13.5078 14.75 13.6719 14.6953 13.7812 14.5586C14.0547 14.3125 14.0547 13.9023 13.7812 13.6289ZM1.3125 6.4375C1.3125 4.03125 3.25391 2.0625 5.6875 2.0625C8.09375 2.0625 10.0625 4.03125 10.0625 6.4375C10.0625 8.87109 8.09375 10.8125 5.6875 10.8125C3.25391 10.8125 1.3125 8.87109 1.3125 6.4375Z"
					fill="currentColor" />
			</svg>

			<input
				type="text"
				placeholder="Search campaign..."
				v-model="options.search" />
		</div>

		<div class="campaign-bar-action">
			<vue-dropdown>
				<template slot="dropdown-button">
					<vue-button class="btn-outline">
						Status

						<svg
							width="9"
							height="6"
							viewBox="0 0 9 6"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.60156 1.50391L5.12891 5.00391C4.9375 5.16797 4.71875 5.25 4.5 5.25C4.25391 5.25 4.03516 5.16797 3.87109 5.00391L0.398438 1.50391C0.125 1.25781 0.0429688 0.875 0.179688 0.546875C0.316406 0.21875 0.644531 0 1 0H7.97266C8.32812 0 8.62891 0.21875 8.76562 0.546875C8.90234 0.875 8.84766 1.25781 8.60156 1.50391Z"
								fill="currentColor" />
						</svg>
					</vue-button>
				</template>
				<div class="dropdown-checkbox">
					<div class="dropdown-checkbox-input">
						<label
							for="running"
							class="dropdown-checkbox-input-label">
							<input
								id="running"
								type="checkbox"
								v-model="options.filter"
								value="running" />
							Running
						</label>
						<label
							for="completed"
							class="dropdown-checkbox-input-label">
							<input
								id="completed"
								type="checkbox"
								v-model="options.filter"
								value="completed" />
							Completed
						</label>
						<label
							for="paused"
							class="dropdown-checkbox-input-label">
							<input
								id="paused"
								type="checkbox"
								v-model="options.filter"
								value="paused" />
							Paused
						</label>
					</div>

					<div class="dropdown-checkbox-action">
						<vue-button
							@clicked="handleClearStatusFilter"
							class="btn-text-primary btn-no-padding"
							>Clear</vue-button
						>
					</div>
				</div>
			</vue-dropdown>

			<vue-dropdown position="right">
				<template slot="dropdown-button">
					<vue-button class="btn-outline">
						<svg
							width="11"
							height="13"
							viewBox="0 0 11 13"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1.86328 5.875H9.10938C9.76562 5.875 10.1211 5.08203 9.62891 4.58984L6.01953 0.871094C5.88281 0.707031 5.69141 0.625 5.5 0.625C5.30859 0.625 5.08984 0.707031 4.95312 0.871094L1.34375 4.58984C0.851562 5.08203 1.20703 5.875 1.86328 5.875ZM9.10938 7.625H1.86328C1.20703 7.625 0.851562 8.44531 1.34375 8.9375L4.95312 12.6562C5.08984 12.8203 5.28125 12.875 5.5 12.875C5.69141 12.875 5.88281 12.8203 6.01953 12.6562L9.62891 8.9375C10.1211 8.44531 9.76562 7.625 9.10938 7.625Z"
								fill="currentColor" />
						</svg>

						Sort
					</vue-button>
				</template>
				<div class="dropdown-radio">
					<div class="dropdown-radio-input">
						<label
							for="lc"
							class="dropdown-radio-input-label">
							<input
								id="lc"
								type="radio"
								v-model="options.sort"
								value="lc" />
							Last created
						</label>
						<label
							for="fc"
							class="dropdown-radio-input-label">
							<input
								id="fc"
								type="radio"
								v-model="options.sort"
								value="fc" />
							First created
						</label>
						<label
							for="cn_asc"
							class="dropdown-radio-input-label">
							<input
								id="cn_asc"
								type="radio"
								v-model="options.sort"
								value="cn_asc" />
							Campaign name (A-Z)
						</label>
						<label
							for="cn_desc"
							class="dropdown-radio-input-label">
							<input
								id="cn_desc"
								type="radio"
								v-model="options.sort"
								value="cn_desc" />
							Campaign name (Z-A)
						</label>
					</div>
					<div class="dropdown-radio-action">
						<vue-button
							@clicked="handleClearSort"
							class="btn-text-primary btn-no-padding"
							>Clear</vue-button
						>
					</div>
				</div>
			</vue-dropdown>
		</div>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import VueDropdown from '@/components/vue-dropdown.vue';

	export default {
		name: 'campaignBar',
		props: ['value'],
		components: {
			VueButton,
			VueDropdown,
		},
		computed: {
			options: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		methods: {
			handleClearSort() {
				this.options.sort = '';
			},
			handleClearStatusFilter() {
				this.options.filter = [];
			},
		},
		beforeDestroy() {},
	};
</script>

<style lang="scss" scoped>
	.campaign-bar {
		display: flex;
		column-gap: 20px;
		padding: 20px;

		&-search {
			padding: 9px 10px;
			flex: 1;
			border: 1px solid $light-1-color;
			border-radius: 3px;
			display: flex;
			align-items: center;
			column-gap: 10px;
			color: $dark-3-color;

			& input {
				flex: 1;
			}
		}

		&-action {
			display: flex;
			column-gap: 14px;
		}
	}
</style>
