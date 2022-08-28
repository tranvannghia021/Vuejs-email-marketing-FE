<template>
	<div class="customer-bar">
		<div class="customer-bar-search">
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
				placeholder="Search customers by name, phone, email..."
				v-model.trim="search"
				@paste="prevent_leading_space"
				@keydown.space="prevent_leading_space" />
		</div>

		<div class="customer-bar-range">
			<vue-dropdown ref="date">
				<template slot="dropdown-button">
					<vue-button class="btn-no-radius">
						Create date
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
				<div class="dropdown-range">
					<div class="dropdown-range-input">
						<input
							type="date"
							:max="date_to || maxDate"
							v-model="date_from"
							@keyup.enter="handle_fetch_customer" />
						<input
							type="date"
							placeholder="To"
							:min="date_from || ''"
							:max="maxDate"
							v-model="date_to"
							@keyup.enter="handle_fetch_customer" />
					</div>
					<div class="dropdown-range-action">
						<vue-button
							class="btn-primary"
							@clicked="handle_fetch_customer"
							>Ok</vue-button
						>
						<vue-button
							class="btn-text-primary btn-no-padding"
							@clicked="
								handle_clear_action({
									action: 'date',
								})
							"
							>Clear</vue-button
						>
					</div>
				</div>
			</vue-dropdown>

			<vue-dropdown ref="spent">
				<template slot="dropdown-button">
					<vue-button class="btn-no-radius">
						Total spent
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
				<div class="dropdown-range">
					<div class="dropdown-range-input">
						<input
							type="number"
							placeholder="From"
							v-model.number.trim="spent_from"
							@keyup.enter="handle_fetch_customer" />

						<input
							type="number"
							placeholder="To"
							v-model.number.trim="spent_to"
							@keyup.enter="handle_fetch_customer" />
					</div>
					<div class="dropdown-range-action">
						<vue-button
							class="btn-primary"
							@clicked="handle_fetch_customer"
							>Ok</vue-button
						>
						<vue-button
							class="btn-text-primary btn-no-padding"
							@clicked="
								handle_clear_action({
									action: 'spent',
								})
							"
							>Clear</vue-button
						>
					</div>
				</div>
			</vue-dropdown>

			<vue-dropdown
				position="right"
				ref="order">
				<template slot="dropdown-button">
					<vue-button class="btn-no-radius">
						Total order
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
				<div class="dropdown-range">
					<div class="dropdown-range-input">
						<input
							type="number"
							placeholder="From"
							v-model.number.trim="order_from"
							@keyup.enter="handle_fetch_customer" />
						<input
							type="text"
							placeholder="To"
							v-model.number.trim="order_to"
							@keyup.enter="handle_fetch_customer" />
					</div>
					<div class="dropdown-range-action">
						<vue-button
							class="btn-primary"
							@clicked="handle_fetch_customer"
							>Ok</vue-button
						>
						<vue-button
							class="btn-text-primary btn-no-padding"
							@clicked="
								handle_clear_action({
									action: 'order',
								})
							"
							>Clear</vue-button
						>
					</div>
				</div>
			</vue-dropdown>
		</div>
		<vue-dropdown
			position="right"
			ref="sort">
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
							v-model="sort"
							value="desc" />
						Last created
					</label>
					<label
						for="fc"
						class="dropdown-radio-input-label">
						<input
							id="fc"
							type="radio"
							v-model="sort"
							value="asc" />
						First created
					</label>
				</div>
				<div class="dropdown-radio-action">
					<vue-button
						class="btn-text-primary btn-no-padding"
						@clicked="
							handle_clear_action({
								action: 'sort',
							})
						"
						>Clear</vue-button
					>
				</div>
			</div>
		</vue-dropdown>
	</div>
</template>

<script>
	import debounce from '@/utils/debounce';
	import VueButton from '@/components/vue-button.vue';
	import VueDropdown from '@/components/vue-dropdown.vue';
	import { mapActions, mapMutations, mapState } from 'vuex';
	export default {
		name: 'CustomerBar',
		components: {
			VueButton,
			VueDropdown,
		},
		data() {
			return {};
		},
		computed: {
			...mapState('customer', ['page', 'actions']),
			maxDate() {
				const today = new Date();
				let month = today.getMonth() + 1;
				let day = today.getDate();
				let year = today.getFullYear();

				if (month < 10) month = '0' + month.toString();
				if (day < 10) day = '0' + day.toString();
				return year + '-' + month + '-' + day;
			},
			search: {
				get() {
					return this.actions.search;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'search',
						value: value,
					});
				},
			},
			sort: {
				get() {
					return this.actions.sort;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'sort',
						value: value,
					});
				},
			},
			date_from: {
				get() {
					return this.actions.date.from;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'date',
						key: 'from',
						value: value,
					});
				},
			},
			date_to: {
				get() {
					return this.actions.date.to;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'date',
						key: 'to',
						value: value,
					});
				},
			},
			order_from: {
				get() {
					return this.actions.order.from;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'order',
						key: 'from',
						value: value,
					});
				},
			},
			order_to: {
				get() {
					return this.actions.order.to;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'order',
						key: 'to',
						value: value,
					});
				},
			},
			spent_from: {
				get() {
					return this.actions.spent.from;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'spent',
						key: 'from',
						value: value,
					});
				},
			},
			spent_to: {
				get() {
					return this.actions.spent.to;
				},
				set(value) {
					this.UPDATE_ACTION({
						action: 'spent',
						key: 'to',
						value: value,
					});
				},
			},
		},
		watch: {
			// WATCH: DELAY CALL API 500MS WHEN SEARCH
			search: debounce(function (value) {
				this.handle_fetch_customer(value.trim());
			}, 500),
			// WATCH: CALL API WHEN SORT CHANGE
			sort(value) {
				this.handle_fetch_customer();
			},
		},
		methods: {
			...mapMutations('customer', [
				'UPDATE_ACTION',
				'CLEAR_ACTION',
				'SET_PAGE',
			]),
			...mapActions('customer', ['get_customer']),
			...mapActions('notification', ['add']),
			// HANDLE CALL API FETCH CUSTOMER
			async handle_fetch_customer(value) {
				try {
					if (!this.valid_date()) {
						this.add({
							type: 'error',
							message: 'Time is invalid.',
						});
						return;
					}
					if (!this.valid_order_spent()) {
						this.add({
							type: 'error',
							message: 'Order or spent is invalid',
						});
						return;
					}
					// Close all dropdown in customer bar
					this.$refs.date.toggleDropdown(false);
					this.$refs.order.toggleDropdown(false);
					this.$refs.spent.toggleDropdown(false);
					this.$refs.sort.toggleDropdown(false);

					// Set page = 1
					if (this.$route.query.page && this.$route.query.page != 1) {
						this.SET_PAGE(1);
						this.$router.replace({
							name: 'Customer',
							query: { page: 1 },
						});
					}

					const res = await this.get_customer();
				} catch (error) {
					console.log(error);
				}
			},
			// HANDLE CLEAR ACTION
			handle_clear_action(payload) {
				// clear
				this.CLEAR_ACTION(payload);
				// call api again
				this.handle_fetch_customer();
			},
			// NOT ALLOW TYPE LEADING SPACE
			prevent_leading_space(e) {
				// Check leading space
				let clipboardData;
				// check event paste
				if (e.type === 'paste') {
					clipboardData = e.clipboardData || window.clipboardData;
					if (clipboardData.getData('Text')[0] == ' ') {
						e.preventDefault();
					}
				} else if (!e.target.value) e.preventDefault();
				else if (e.target.value[0] == ' ')
					// check when copy paste then replace
					e.target.value = e.target.value.replace(/^\s*/, '');
				else {
					//  check double space then replace
					e.target.value = e.target.value.replace(/ +(?= )/g, '');
				}
			},
			// VALIDATION DATE BEFORE CALL API
			valid_date() {
				// check date > current date
				if (
					(this.date_from && this.date_from > this.maxDate) ||
					(this.date_to && this.date_to > this.maxDate)
				) {
					return false;
				}
				// check date from > date to
				if (
					this.date_from &&
					this.date_to &&
					this.date_from > this.date_to
				) {
					return false;
				}

				return true;
			},
			// VALIDATE ORDER AND SPENT BEFORE CALL API
			valid_order_spent() {
				// check order from > order to
				if (
					this.order_from &&
					this.order_to === 0 &&
					this.order_from > this.order_to
				) {
					return false;
				}
				if (
					this.order_from &&
					this.order_to &&
					this.order_from > this.order_to
				) {
					return false;
				}
				// check spent from > spent to
				if (
					this.spent_from &&
					this.spent_to === 0 &&
					this.spent_from > this.spent_to
				) {
					return false;
				}
				if (
					this.spent_from &&
					this.spent_to &&
					this.spent_from > this.spent_to
				) {
					return false;
				}
				return true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.customer-bar {
		display: flex;
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

		&-range {
			display: flex;
			margin: 0 10px 0 20px;
			border: 1px solid $light-1-color;
			border-radius: 3px;

			& > *:not(:last-child) {
				border-right: 1px solid $light-1-color;
			}
		}
	}
</style>
