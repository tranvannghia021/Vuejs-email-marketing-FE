<template>
	<vue-modal
		v-model="toggleModal"
		width="960px"
		:full_height="true"
		class="modal-customer">
		<template slot="header">
			<h1 class="modal-customer-title">Select customers to send email</h1>
		</template>
		<vue-input
			v-model="search"
			class="modal-customer-input"
			placeholder="Search customers by name, phone, email...">
			<template slot="content-left">
				<svg
					width="14"
					height="18"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M13.7812 13.6289L10.1172 9.96484C10.9102 9.00781 11.3477 7.77734 11.3477 6.4375C11.3477 3.32031 8.77734 0.75 5.66016 0.75C2.51562 0.75 0 3.32031 0 6.4375C0 9.58203 2.54297 12.125 5.66016 12.125C6.97266 12.125 8.20312 11.6875 9.1875 10.8945L12.8516 14.5586C12.9883 14.6953 13.1523 14.75 13.3438 14.75C13.5078 14.75 13.6719 14.6953 13.7812 14.5586C14.0547 14.3125 14.0547 13.9023 13.7812 13.6289ZM1.3125 6.4375C1.3125 4.03125 3.25391 2.0625 5.6875 2.0625C8.09375 2.0625 10.0625 4.03125 10.0625 6.4375C10.0625 8.87109 8.09375 10.8125 5.6875 10.8125C3.25391 10.8125 1.3125 8.87109 1.3125 6.4375Z"
						fill="#8F90A6" />
				</svg>
			</template>
		</vue-input>

		<div class="modal-customer-table">
			<table>
				<colgroup>
					<col
						span="1"
						style="width: 6.25%" />
					<col
						span="1"
						style="width: 28.5%" />
					<col
						span="1"
						style="width: 25%" />
					<col
						span="1"
						style="width: 26.5%" />
					<col
						span="1"
						style="width: 13.75%" />
				</colgroup>
				<thead>
					<tr>
						<th>
							<div class="modal-customer-table-checkbox">
								<input
									type="checkbox"
									v-model="check_all" />
							</div>
						</th>
						<th>Customer</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Create date</th>
					</tr>
				</thead>

				<tbody>
					<tr v-show="customers.length == 0">
						<td
							colspan="7"
							class="text-center">
							Customer not found
						</td>
					</tr>
					<tr
						v-show="customers.length != 0"
						v-for="customer in customers"
						:key="customer.id"
						:class="{
							active: customersSelectedRender.includes(customer),
						}">
						<td>
							<div class="modal-customer-table-checkbox">
								<input
									v-model="customersSelectedRender"
									type="checkbox"
									:value="customer" />
							</div>
						</td>
						<td>
							<div class="modal-customer-table-customer">
								<vue-avatar-by-name
									:name="
										customer.first_name +
										' ' +
										customer.last_name
									"
									color="secondary"></vue-avatar-by-name>
								<span
									class="modal-customer-table-customer-name"
									>{{
										customer.first_name +
										' ' +
										customer.last_name
									}}</span
								>
							</div>
						</td>
						<td>{{ customer.phone || 'None' }}</td>
						<td>
							<div class="modal-customer-table-email">
								{{ customer.email || 'None' }}
							</div>
						</td>
						<td>
							<div class="modal-customer-table-date">
								{{
									new Date(
										customer.customer_created_at
									).toLocaleString('en-US', {
										day: 'numeric',
										year: 'numeric',
										month: 'short',
									})
								}}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="modal-customer-footer">
			<div class="modal-customer-footer-selected">
				Customers has been selected:
				{{ customersSelectedRender.length }}
			</div>
			<div class="modal-customer-footer-pagination">
				<vue-button
					class="btn-no-radius"
					@clicked="handlePrev"
					:disabled="disabledPrev">
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
					@clicked="handleNext"
					:disabled="disabledNext">
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

			<div class="modal-customer-footer-action">
				<vue-button
					@clicked="cancel"
					class="btn-outline btn-small btn-cancel"
					>Cancle</vue-button
				>
				<vue-button
					ref="next_button"
					@clicked="handleInsert"
					class="btn-primary btn-small btn-insert"
					>Insert</vue-button
				>
			</div>
		</div>
	</vue-modal>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import VueInput from '@/components/vue-input.vue';
	import VueModal from '@/components/vue-modal.vue';
	import VueAvatarByName from '@/components/vue-avatar-by-name.vue';
	import api from '@/plugins/api';
	import debounce from '@/utils/debounce';
	import { mapMutations, mapState } from 'vuex';

	export default {
		name: 'campaign-modal-customer',
		components: {
			VueButton,
			VueInput,
			VueModal,
			VueAvatarByName,
		},
		props: ['value'],
		data() {
			return {
				customersSelectedRender: [],
				customersSelected: [],
				currentPage: 1,
				disabledNext: false,
				disabledPrev: true,
				customers: [],
				search: '',
			};
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
			toggleModal: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
			check_all: {
				get() {
					// check status checkall
					// checkall = true while user check one of customers or more customers
					for (let i of this.customersSelectedRender) {
						for (let j of this.customers) {
							if (i.id == j.id) {
								return true;
							}
						}
					}
				},
				set(value) {
					let customersCheckedInPage = [];
					let CustomersUncheckedInPage = [];
					for (let i of this.customers) {
						let flag = 0;
						for (let j of this.customersSelectedRender) {
							if (i.id == j.id) {
								flag = 1;
								break;
							}
						}
						if (flag == 0) {
							// array contain customers checked in current page
							customersCheckedInPage = [
								...customersCheckedInPage,
								i,
							];
						} else {
							// array contain customers unchecked in current page
							CustomersUncheckedInPage = [
								...CustomersUncheckedInPage,
								i.id,
							];
						}
					}
					if (value) {
						// if checkall = true, check all customers in current page
						this.customersSelectedRender = [
							...this.customersSelectedRender,
							...customersCheckedInPage,
						];
					} else {
						// if checkall = false, uncheck all customer in current page
						this.customersSelectedRender =
							this.customersSelectedRender.filter(function (
								value
							) {
								return !CustomersUncheckedInPage.includes(
									value.id
								);
							});
					}
				},
			},
		},
		watch: {
			search: debounce(function (value) {
				this.handleSearch();
			}, 500),
			toggleModal() {
				//check toggle modal
				if (this.toggleModal) {
					// assign list customers saved on store for modal
					this.customersSelectedRender = this.new_campaign.customers;
				} else {
					// reset modal
					this.customersSelectedRender = [];
					this.search = '';
					if (this.currentPage != 1) {
						this.get_customer({
							page: 1,
						});
					}
					this.currentPage = 1;
				}
			},
		},
		methods: {
			...mapMutations({
				setCustomers: 'campaign/SET_CUSTOMERS',
			}),
			async get_customer(value) {
				// get list customer for modal select customers in create new campaign
				try {
					let payload =
						value.type && value.q
							? {
									page: value.page,
									type: value.type,
									q: value.q,
							  }
							: {
									page: value.page,
							  };
					const res = await api.CUSTOMER.getCustomer(payload);
					if (res.success) {
						this.customers = res.data;
						this.currentPage = res.current_page;
						this.disabledNext = res.next_page_url ? false : true;
						this.disabledPrev = res.prev_page_url ? false : true;
					}
				} catch (error) {
					return error.response?.data
						? error.response.data
						: { success: false, message: 'Server error' };
				}
			},
			cancel() {
				this.toggleModal = false;
			},
			handleInsert() {
				// insert list customer selected in list customer on store
				this.setCustomers(this.customersSelectedRender);
				this.toggleModal = false;
			},
			async handlePrev() {
				// enable screen loading and  disable buttons pagination while loading
				this.disabledPrev = true;
				this.disabledNext = true;
				// handle prev page
				this.currentPage--;
				// handle api
				let payload = this.search
					? {
							page: this.currentPage,
							type: 'search',
							q: this.search,
					  }
					: {
							page: this.currentPage,
					  };
				await this.get_customer(payload);
			},
			async handleNext() {
				// enable screen loading and  disable buttons pagination while loading
				this.disabledPrev = true;
				this.disabledNext = true;
				// handle next page
				this.currentPage++;
				// handle api
				let payload = this.search
					? {
							page: this.currentPage,
							type: 'search',
							q: this.search,
					  }
					: {
							page: this.currentPage,
					  };

				await this.get_customer(payload);
			},
			async handleSearch() {
				// enable screen loading and disable buttons pagination while search
				this.disabledPrev = true;
				this.disabledNext = true;
				// handle api search
				await this.get_customer({
					page: 1,
					type: 'search',
					q: this.search,
				});
			},
			handleKey(e) {
				if (this.toggleModal) {
					if (e.key == 'ArrowRight') {
						if (!this.disabledNext) {
							this.handleNext();
						}
					} else if (e.key == 'ArrowLeft') {
						if (!this.disabledPrev) {
							this.handlePrev();
						}
					}
				}
			},
		},
		async created() {
			await this.get_customer({
				page: 1,
			});
		},
		mounted() {
			window.addEventListener('keyup', this.handleKey);
		},
		beforeDDestroy() {
			window.removeEventListener('keyup', this.handleKey);
		},
	};
</script>

<style lang="scss" scoped>
	.modal-customer {
		&-title {
			padding: 30px 30px 28px 30px;
			color: $dark-1-color;
			font-weight: 600;
			font-size: 2.4rem;
			line-height: 24px;
		}

		&-input {
			padding: 0 30px;
		}

		&-table {
			margin-top: 14px;
			overflow: hidden auto;
			flex: 1;
			position: relative;

			// &::-webkit-scrollbar {
			// 	display: none;
			// }
			&::-webkit-scrollbar-track-piece:start {
				background: transparent;
				margin-top: 50px;
			}

			// CSS table chung
			& table {
				width: 100%;
				border-collapse: collapse;

				& thead tr {
					position: sticky;
					top: 0;
					left: 0;
					box-shadow: inset 0 -1px 0 $light-1-color;
					background-color: $white-color;
					z-index: 10;
				}
				& tbody tr {
					border-bottom: 1px solid $light-1-color;
					background-color: $white-color;
					transition: all 0.2s ease;

					&.active {
						background: rgba(0, 48, 132, 0.05);
					}

					&:hover {
						background-color: rgba(0, 48, 132, 0.05);
					}
				}

				& th {
					padding: 17px 0;
					font-size: 12px;
					font-weight: 600;
					color: $dark-3-color;

					&:nth-of-type(1) {
						padding-left: 30px;
					}
				}
				& td {
					padding: 14px 0;

					&:nth-of-type(1) {
						padding-left: 30px;
					}
				}
			}

			& th .modal-customer-table-checkbox {
				& input::after {
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

				& input::before {
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

				& input:checked::before {
					background-color: $primary-color;
					border-color: $primary-color;
				}

				& input:checked::after {
					background-color: $white-color;
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
		}

		&-footer {
			padding: 24px 30px 18px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&-selected {
				color: $dark-3-color;
			}

			&-pagination {
				display: flex;
				border: 1px solid $light-1-color;
				border-radius: 4px;

				& *:first-child {
					border-right: 1px solid $light-1-color;
				}
				& button {
					width: 110px;
				}
			}

			&-action {
				display: flex;
				column-gap: 16px;
			}
		}
	}
	.btn {
		&-insert {
			min-width: 90px;
		}
	}
</style>
