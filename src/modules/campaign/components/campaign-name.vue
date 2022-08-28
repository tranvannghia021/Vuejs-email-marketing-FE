<template>
	<div class="card">
		<h1 class="card-title">Campaign name</h1>
		<vue-input
			placeholder="Enter your campaign name"
			:length="255"
			v-model="name"></vue-input>
	</div>
</template>

<script>
	import VueInput from '@/components/vue-input.vue';
	import { mapMutations, mapState } from 'vuex';

	export default {
		name: 'campaign-name',
		components: {
			VueInput,
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
			name: {
				get() {
					return this.new_campaign.name;
				},
				set(value) {
					this.setCampaignName(value);
				},
			},
		},
		watch: {
			name() {
				if (this.name == '') {
					document.title = 'Campaign Create Page';
				} else {
					document.title = this.name;
				}
			},
		},
		methods: {
			...mapMutations({
				setCampaignName: 'campaign/SET_CAMPAIGN_NAME',
			}),
		},
	};
</script>

<style lang="scss" scoped></style>
