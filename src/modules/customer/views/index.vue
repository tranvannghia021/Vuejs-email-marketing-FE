<template>
	<div class="vue-customer">
		<!-- Customer Header Component -->
		<customer-header />

		<div class="vue-customer-content">
			<template v-if="is_progress_loading">
				<customer-progress-loading :percent="percent" />
			</template>
			<div
				class="vue-customer-content-table"
				v-else>
				<!-- Customer Bar Component -->
				<customer-bar />

				<div class="vue-customer-content-table-scroll">
					<table>
						<colgroup>
							<col
								span="1"
								style="width: 5%" />
							<col
								span="1"
								style="width: 21%" />
							<col
								span="1"
								style="width: 13%" />
							<col
								span="1"
								style="width: 21%" />
							<col
								span="1"
								style="width: 15%" />
							<col
								span="1"
								style="width: 14%" />
							<col
								span="1"
								style="width: 11%" />
						</colgroup>
						<thead class="vue-customer-content-table-header">
							<tr v-if="selected_list.length === 0">
								<th>
									<div
										class="vue-customer-content-table-checkbox">
										<input
											type="checkbox"
											:class="{
												'vue-customer-content-table-checkbox-indeterminate':
													indeterminate,
											}"
											v-model="check_all" />
									</div>
								</th>
								<th>Customer</th>
								<th>Phone</th>
								<th>Email</th>
								<th>Orders</th>
								<th>Spent</th>
								<th>Create date</th>
							</tr>
							<tr v-else>
								<th
									colspan="7"
									class="vue-customer-content-table-selected">
									<div
										class="vue-customer-content-table-wrapper">
										<div
											class="vue-customer-content-table-wrapper-button">
											<div
												class="vue-customer-content-table-checkbox">
												<input
													type="checkbox"
													:class="{
														'vue-customer-content-table-checkbox-indeterminate':
															indeterminate,
													}"
													v-model="check_all" />
											</div>
											<span
												>{{
													selected_list.length
												}}
												Selected</span
											>
										</div>

										<vue-button
											class="btn-outline"
											@clicked="export_customer_csv"
											:disabled="
												is_export_loading ||
												is_progress_loading ||
												sync_loading
											">
											<svg
												:class="{
													'vue-customer-content-table-wrapper-export':
														is_export_loading,
												}"
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
											class="btn-outline btn-text-error"
											@clicked="handle_uncheck">
											Uncheck All
										</vue-button>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<customer-item
								v-for="customer in customers"
								:customer="customer"
								:key="customer.id"
								v-model="selected_list" />
							<tr v-if="!fetch_loading && customers.length === 0">
								<td
									colspan="7"
									style="text-align: center">
									Customer not found.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<div
			class="vue-customer-pagination"
			v-if="!is_progress_loading">
			<vue-button
				class="btn-no-radius"
				:disabled="parseInt(page) === 1 || fetch_loading"
				:to="{
					path: $route.path || '/',
					query: {
						page: parseInt(this.page) - 1,
					},
				}">
				<svg
					width="15"
					height="8"
					viewBox="0 0 15 8"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14.5 3.75C14.5 4.24219 14.0898 4.625 13.625 4.625H4.875V6.59375C4.875 6.86719 4.71094 7.11328 4.46484 7.19531C4.21875 7.30469 3.94531 7.27734 3.75391 7.08594L0.691406 4.24219C0.417969 3.99609 0.417969 3.53125 0.691406 3.28516L3.75391 0.441406C3.94531 0.25 4.21875 0.222656 4.46484 0.304688C4.71094 0.414062 4.875 0.660156 4.875 0.90625V2.875H13.625C14.0898 2.875 14.5 3.28516 14.5 3.75Z"
						fill="currentColor" />
				</svg>
				Previous
			</vue-button>
			<vue-button
				class="btn-no-radius"
				:disabled="!has_next || fetch_loading"
				:to="{
					path: $route.path || '/',
					query: {
						page: parseInt(this.page) + 1,
					},
				}">
				Next
				<svg
					width="15"
					height="8"
					viewBox="0 0 15 8"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M14.2812 4.24219L11.2188 7.08594C11.0273 7.27734 10.7539 7.30469 10.5078 7.22266C10.2617 7.11328 10.0977 6.86719 10.0977 6.62109V4.625H1.375C0.882812 4.625 0.5 4.24219 0.5 3.75C0.5 3.23047 0.882812 2.875 1.375 2.875H10.0977V0.90625C10.0977 0.660156 10.2617 0.414062 10.5078 0.304688C10.7539 0.222656 11.0273 0.25 11.2188 0.441406L14.2812 3.28516C14.5547 3.53125 14.5547 3.99609 14.2812 4.24219Z"
						fill="currentColor" />
				</svg>
			</vue-button>
		</div>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import CustomerHeader from '../components/customer-header.vue';
	import CustomerBar from '../components/customer-bar.vue';
	import CustomerProgressLoading from '../components/customer-progress-loading.vue';
	import { mapActions, mapMutations, mapState } from 'vuex';
	import CustomerItem from '../components/customer-item.vue';

	export default {
		name: 'Customer',
		components: {
			VueButton,
			CustomerHeader,
			CustomerBar,
			CustomerProgressLoading,
			CustomerItem,
		},
		data() {
			return {};
		},
		computed: {
			...mapState('customer', [
				'is_export_loading',
				'percent',
				'is_progress_loading',
				'fetch_loading',
				'sync_loading',
				'customers',
				'selected',
				'page',
				'has_next',
			]),
			// HANDLE CHECK ALL CUSTOMER IN ONE PAGE
			check_all: {
				get() {
					// check selected full customer in one page then return true
					if (this.customers.length === 0) return false;
					let is_selected = true;
					for (let i = 0; i < this.customers.length; i++) {
						if (!this.selected.includes(this.customers[i].id)) {
							is_selected = false;
							break;
						}
					}
					return is_selected;
				},
				set(value) {
					if (!value) {
						const deleteId = [];
						// when checkall = false, reset selected list, unchecked customer in one page
						this.selected.forEach((select) => {
							let checked = false;
							this.customers.map((customer) => {
								if (customer.id === select) {
									checked = true;
									return;
								}
							});
							if (!checked) {
								deleteId.push(select);
							}
						});
						// update selected list
						this.UPDATE_SELECTED(deleteId);
					} else {
						// get all customer id in one page to array
						const checkId = this.customers.map(
							(customer) => customer.id
						);
						// merge 2 array, remove duplicate item
						const newList = this.selected
							.concat(checkId)
							.filter((id, index, arr) => {
								return arr.indexOf(id) === index;
							});
						// update selected list
						this.UPDATE_SELECTED([...newList]);
					}
				},
			},
			// SELECT ITEM
			selected_list: {
				get() {
					return this.selected;
				},
				set(value) {
					this.UPDATE_SELECTED(value);
				},
			},
			// check has selected in one page
			has_selected_in_page() {
				let is_selected = false;
				for (let i = 0; i < this.customers.length; i++) {
					if (this.selected.includes(this.customers[i].id)) {
						is_selected = true;
						break;
					}
				}
				return is_selected;
			},
			// show/hide indeterminate checkbox
			indeterminate: {
				get() {
					// if not selected in one page return false
					if (!this.has_selected_in_page) {
						return false;
					}
					// check show indeterminate
					let is_indeterminate = false;
					for (let i = 0; i < this.customers.length; i++) {
						if (!this.selected.includes(this.customers[i].id)) {
							is_indeterminate = true;
							break;
						}
					}
					return is_indeterminate;
				},
				set(value) {},
			},
		},
		methods: {
			...mapActions('customer', ['get_customer', 'export_csv']),
			...mapActions('notification', ['add']),
			...mapMutations('customer', [
				'SET_PAGE',
				'UPDATE_SELECTED',
				'SET_EXPORT_LOADING',
			]),
			// FETCH CUSTOMER
			async fetch_customers() {
				try {
					const res = await this.get_customer();
				} catch (error) {}
			},
			// EXPORT CUSTOMER TO CSV
			async export_customer_csv() {
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
					console.log(error);
				}
			},
			handle_uncheck() {
				this.UPDATE_SELECTED([]);
			},
		},
		created() {
			this.SET_PAGE(this.$route.query.page || 1);

			this.fetch_customers();
		},
	};
</script>

<style lang="scss">
	.loading {
		position: absolute;
	}
	.vue-customer {
		position: relative;
		padding: 35px 55px 28px;
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		&-content {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;

			&-table {
				position: relative;
				margin-top: 20px;
				flex: 1;
				background-color: $white-color;
				box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
					0px 0.5px 2px rgba(96, 97, 112, 0.16);
				border-radius: 4px;
				display: flex;
				flex-direction: column;
				overflow: hidden;

				&-scroll {
					position: relative;
					overflow: hidden auto;
					flex: 1;

					// &::-webkit-scrollbar {
					// 	display: none;
					// }

					&::-webkit-scrollbar-track-piece:start {
						background: transparent;
						margin-top: 60px;
					}
				}

				& table {
					width: 100%;
					border-collapse: collapse;
					// table-layout: fixed;

					& thead,
					tbody {
						& tr {
							border-bottom: 1px solid $light-1-color;
						}
					}
					& td {
						overflow: hidden;
						padding: 14px 0;

						&:first-child {
							padding-left: 30px;
						}
						&:last-child {
							padding-right: 20px;
						}
					}
				}

				&-header {
					position: sticky;
					top: 0;
					left: 0;
					box-shadow: inset 0 -1px 0 $light-1-color;
					background-color: $white-color;
					z-index: 10;

					& th {
						padding: 22px 0px;
						color: $dark-3-color;
						font-size: 1.2rem;
						line-height: 1.6rem;
						font-weight: 600;
						text-align: left;

						&:first-child {
							padding-left: 30px;
						}
						&:last-child {
							padding-right: 20px;
						}
					}

					& th.vue-customer-content-table-selected {
						padding-left: 20px;
						padding-bottom: 12px;
						padding-top: 12px;
					}

					& .vue-customer-content-table-checkbox {
						&
							input.vue-customer-content-table-checkbox-indeterminate::after {
							content: '';
							border-radius: 2px;
							width: 62.5%;
							height: 3px;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							background-color: $white-color;
							border: 0;
						}

						&
							input.vue-customer-content-table-checkbox-indeterminate::before {
							// box-sizing: border-box;
							content: '';
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							background-color: $white-color;
							border: 1px solid $dark-4-color;
							border-radius: 2px;
						}

						&
							input.vue-customer-content-table-checkbox-indeterminate::before {
							background-color: $primary-color;
							border-color: $primary-color;
						}

						&
							input.vue-customer-content-table-checkbox-indeterminate::after {
							background-color: $white-color;
						}
					}
				}

				&-checkbox {
					display: flex;
					align-items: center;
					justify-content: left;
					& input {
						-moz-appearance: none;
						-webkit-appearance: none;
						-o-appearance: none;
						appearance: none;
						position: relative;
						width: 16px;
						height: 16px;
						cursor: pointer;
					}

					& input::after {
						box-sizing: border-box;
						font-family: 'FontAwesome';
						content: '\f00c';
						position: absolute;
						font-size: 1.1rem;
						line-height: 16px;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						color: $white-color;
						background: $white-color;
						border-radius: 2px;
						border: 1px solid $dark-4-color;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					& input:checked::after {
						border-color: $primary-color;
						background: $primary-color;
					}
				}

				&-customer {
					display: flex;
					align-items: center;
					column-gap: 12px;

					&-avt {
						width: 32px;
						height: 32px;
						background-color: $light-2-color;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						color: $dark-2-color;
						font-size: 13px;
						font-weight: 500;
					}
				}

				&-email {
					color: $primary-color;
				}

				&-date {
					color: $dark-3-color;
				}

				&-wrapper {
					display: flex;
					column-gap: 8px;
					align-items: center;

					&-button {
						padding: 8px 10px;
						display: flex;
						align-items: center;
						column-gap: 15px;
						border-radius: 4px;
						border: 1px solid $light-1-color;
					}

					& span {
						font-size: 14px;
						line-height: 18px;
						font-weight: 500;
						color: $dark-2-color;
					}

					&-export {
						animation: down 1s ease-in-out infinite;
					}
				}
			}
		}

		&-pagination {
			margin: 20px auto 0;
			display: flex;
			border: 1px solid $light-1-color;
			background-color: $white-color;
			border-radius: 3px;

			& *:first-child {
				border-right: 1px solid $light-1-color;
			}

			& button,
			a {
				width: 110px;
			}
		}
	}
</style>
