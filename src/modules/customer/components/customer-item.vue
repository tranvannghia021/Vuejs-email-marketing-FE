<template>
	<tr :key="customer.id">
		<td>
			<div class="vue-customer-content-table-checkbox">
				<input
					type="checkbox"
					v-model="model"
					:value="customer.id" />
			</div>
		</td>
		<td>
			<div class="vue-customer-content-table-customer">
				<vue-avatar-by-name
					:name="full_name"
					color="secondary" />
				<span class="vue-customer-content-table-customer-name">{{
					full_name
				}}</span>
			</div>
		</td>
		<td>{{ customer.phone || 'None' }}</td>
		<td class="vue-customer-content-table-email">
			{{ customer.email || 'None' }}
		</td>
		<td>{{ customer.total_order }}</td>
		<td>${{ customer.total_spent }}</td>
		<td>
			<div class="vue-customer-content-table-date">
				{{ date }}
			</div>
		</td>
	</tr>
</template>

<script>
	import VueAvatarByName from '@/components/vue-avatar-by-name.vue';
	export default {
		name: 'CustomerItem',
		components: {
			VueAvatarByName,
		},
		props: {
			customer: {
				type: Object,
				require: true,
			},
			value: Array,
		},
		computed: {
			full_name() {
				return this.customer.first_name + ' ' + this.customer.last_name;
			},
			date() {
				const options = {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				};
				return new Date(
					this.customer.customer_created_at
				).toLocaleDateString('en-US', options);
			},
			model: {
				get() {
					return this.value;
				},
				set(newValue) {
					this.$emit('input', newValue);
				},
			},
		},
	};
</script>

<style lang="scss" scoped></style>
