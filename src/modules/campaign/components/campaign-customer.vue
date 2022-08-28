<template>
	<div class="card">
		<campaign-modal-customer
			v-model="CustomerModal"></campaign-modal-customer>
		<h1 class="card-title">Send to customer?</h1>
		<div
			v-show="new_campaign.customers.length > 0"
			class="show-customer">
			<div class="flex center">
				<div class="list-avatar">
					<vue-avatar-by-name
						v-for="customer in new_campaign.customers.slice(0, 3)"
						:key="customer.id"
						:name="customer.first_name + ' ' + customer.last_name"
						class="avatar"
						color="primary"></vue-avatar-by-name>
				</div>

				<span
					class="more-customer"
					v-show="new_campaign.customers.length - 3 > 0"
					>+ {{ new_campaign.customers.length - 3 }} customer</span
				>
			</div>
			<span
				class="link"
				@click="toggleCustomerModal"
				>Manage</span
			>
		</div>
		<vue-button
			v-show="new_campaign.customers.length == 0"
			@clicked="toggleCustomerModal"
			class="btn-outline btn-add-customer">
			<template slot="button-icon">
				<svg
					width="9"
					height="12"
					viewBox="0 0 13 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12.1875 5.75C12.1875 6.24219 11.7773 6.65234 11.3125 6.65234H7.375V10.5898C7.375 11.0547 6.96484 11.4375 6.5 11.4375C6.00781 11.4375 5.625 11.0547 5.625 10.5898V6.65234H1.6875C1.19531 6.65234 0.8125 6.24219 0.8125 5.75C0.8125 5.28516 1.19531 4.90234 1.6875 4.90234H5.625V0.964844C5.625 0.472656 6.00781 0.0625 6.5 0.0625C6.96484 0.0625 7.375 0.472656 7.375 0.964844V4.90234H11.3125C11.7773 4.875 12.1875 5.28516 12.1875 5.75Z"
						fill="#3E7BFA" />
				</svg>
			</template>
			Add customer</vue-button
		>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import CampaignModalCustomer from './campaign-modal-customer.vue';
	import VueAvatarByName from '@/components/vue-avatar-by-name.vue';
	import { mapState } from 'vuex';

	export default {
		name: 'campaign-customer',
		components: {
			VueButton,
			CampaignModalCustomer,
			VueAvatarByName,
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
		},
		data() {
			return {
				CustomerModal: false,
			};
		},
		methods: {
			toggleCustomerModal() {
				this.CustomerModal = !this.CustomerModal;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn-add-customer {
		padding: 13px 0;
		color: #3e7bfa;
		border: none;
		border-radius: 4px;
		background-color: $light-3-color;
		font-weight: 400;
		font-size: 14px;
		line-height: 24px;
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='6' stroke-dashoffset='0' filter='invert(95%) sepia(8%) saturate(122%) hue-rotate(202deg) brightness(96%) contrast(93%)' stroke-linecap='square'/%3e%3c/svg%3e");
	}

	.show-customer {
		background: #f2f2f5;
		display: flex;
		padding: 9px 13px 9px 11px;
		border-radius: 4px;
		justify-content: space-between;
		align-items: center;
	}

	.link {
		font-size: 14px;
		line-height: 24px;
		color: #3e7bfa;
	}

	.center {
		align-items: center;
		gap: 5px;
	}

	.list-avatar {
		display: flex;
		position: relative;
	}

	.avatar {
		&:nth-of-type(2) {
			position: absolute;
			left: 26px;
		}
		&:nth-of-type(3) {
			position: absolute;
			left: 52px;
		}
	}
	.more-customer {
		margin-left: 50px;
	}
</style>
