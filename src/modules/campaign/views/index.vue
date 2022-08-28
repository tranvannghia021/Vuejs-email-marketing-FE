<template>
	<div class="vue-campaign">
		<campaign-header />
		<div class="vue-campaign-content">
			<div class="vue-campaign-content-table">
				<campaign-bar v-model="options" />
				<div class="vue-campaign-content-table-scroll">
					<table>
						<colgroup>
							<col
								span="1"
								style="width: 27%" />
							<col
								span="1"
								style="width: 9.5%" />
							<col
								span="1"
								style="width: 12%" />
							<col
								span="1"
								style="width: 12%" />
							<col
								span="1"
								style="width: 15.5%" />
							<col
								span="1"
								style="width: 16%" />
							<col
								span="1"
								style="width: 8%" />
						</colgroup>
						<thead class="vue-campaign-content-table-header">
							<tr>
								<th>Campaign name</th>
								<th>Create date</th>
								<th>Status</th>
								<th>Progress</th>
								<th>Total Customers</th>
								<th>Send</th>
								<th>Fail</th>
							</tr>
						</thead>
						<tbody>
							<campaign-item
								v-show="campaignsHandled.length != 0"
								v-for="campaign in campaignsHandled"
								:key="campaign.id"
								:campaign="campaign" />
							<tr
								v-show="
									campaignsHandled.length == 0 && !is_loading
								">
								<td
									colspan="7"
									style="text-align: center">
									Campaign not found.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import CampaignBar from '../components/Campaigns/campaign-bar.vue';
	import CampaignHeader from '../components/Campaigns/campaign-header.vue';
	import campaignItem from '../components/campaign-item.vue';
	import { mapActions, mapMutations, mapState } from 'vuex';
	import store from '@/store';

	export default {
		name: 'Campaign',
		components: {
			VueButton,
			CampaignBar,
			CampaignHeader,
			campaignItem,
		},
		data() {
			return {
				campaignsHandled: [],
				is_loading: false,
				options: {
					sort: '',
					filter: [],
					search: '',
				},
			};
		},
		computed: {
			...mapState('campaign', ['campaigns']),
		},
		watch: {
			campaigns: {
				handler(value) {
					this.campaignsHandled = value;
				},
				deep: true,
			},
			options: {
				handler(value) {
					let option = value;
					this.campaignsHandled = this.campaigns.filter(function (
						value
					) {
						return option.filter.length != 0
							? value.name
									.toLowerCase()
									.trim()
									.includes(
										option.search.toLowerCase().trim()
									) && option.filter.includes(value.status)
							: value.name
									.toLowerCase()
									.trim()
									.includes(
										option.search.toLowerCase().trim()
									);
					});
					if (option.sort == 'cn_asc') {
						this.campaignsHandled.sort(function (a, b) {
							if (a.name < b.name) {
								return -1;
							}
							if (a.name > b.name) {
								return 1;
							}
							return 0;
						});
					} else if (option.sort == 'cn_desc') {
						this.campaignsHandled.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (a.name < b.name) {
								return 1;
							}
							return 0;
						});
					} else if (option.sort == 'lc') {
						this.campaignsHandled.sort(function (a, b) {
							return (
								Date.parse(b.created_at) -
								Date.parse(a.created_at)
							);
						});
					} else if (option.sort == 'fc') {
						this.campaignsHandled.sort(function (a, b) {
							return (
								Date.parse(a.created_at) -
								Date.parse(b.created_at)
							);
						});
					}
				},
				deep: true,
			},
		},
		methods: {
			...mapActions({
				get_campaigns: 'campaign/getCampaigns',
			}),
			...mapMutations({
				setCampaigns: 'campaign/SET_CAMPAIGNS',
				setStatusAllCampaigns: 'campaign/SET_STATUS_ALL_COMPAIGN',
			}),
			async handle_get_campaign() {
				try {
					const res = await this.get_campaigns();
					if (res.success) {
						this.setCampaigns(res.data);
						this.setStatusAllCampaigns();
					}
				} catch (error) {
					store.dispatch('notification/add', {
						type: 'error',
						message: error.data.message,
					});
				}
			},
		},
		created() {
			this.handle_get_campaign();
		},
	};
</script>

<style lang="scss">
	.vue-campaign {
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
					overflow: hidden auto;

					// &::-webkit-scrollbar {
					// 	display: none;
					// }
					&::-webkit-scrollbar-track-piece:start {
						background: transparent;
						margin-top: 43px;
					}
				}

				& table {
					width: 100%;
					border-collapse: collapse;
					& tbody {
						position: relative;

						& tr {
							border-bottom: 1px solid $light-1-color;
						}
					}
					& th {
						padding: 5px 0 22px;
					}
					& td {
						padding: 26px 0;
					}
					& td,
					& th {
						&:first-child {
							padding-left: 20px;
							padding-right: 16px;
						}
						&:last-child {
							padding-right: 20px;
						}

						&:nth-of-type(3) {
							padding-left: 25px;
						}
					}

					& td:nth-of-type(3) {
						border-left: 1px solid $light-1-color;
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
					}
				}

				&-name {
					display: flex;
					align-items: center;
					column-gap: 12px;
					font-weight: 600;

					&-icon {
						width: 32px;
						min-width: 32px;
						height: 32px;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: $light-2-color;
						border-radius: 3px;
						color: $dark-2-color;
					}

					&-title {
						display: flex;
						align-items: center;
						line-height: 16px;
						height: 32px;
						width: 100%;
					}

					& span {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						word-break: break-word;
					}
				}

				&-status {
					width: 75px;
					height: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
					text-transform: uppercase;
					font-size: 10px;
					line-height: 12px;
					font-weight: 700;
					letter-spacing: 0.4px;
					border-radius: 3px;

					&.running {
						background-color: $light-3-color;
						color: $primary-color;
					}
					&.completed {
						background-color: $green-4-color;
						color: $success-color;
					}

					&.paused {
						background-color: $red-5-color;
						color: $red-1-color;
					}
				}

				&-progress {
					display: flex;
					flex-direction: column;
					row-gap: 3px;
					width: 100px;
					font-size: 1rem;
					font-weight: 600;
					line-height: 1.2rem;
					position: relative;

					&.running {
						color: $primary-color;

						& .vue-campaign-content-table-progress-bar div {
							background-color: $primary-color;
						}
					}

					&.completed {
						color: $success-color;
						& .vue-campaign-content-table-progress-bar div {
							background-color: $success-color;
						}
					}

					&.paused {
						color: $red-1-color;
						& .vue-campaign-content-table-progress-bar div {
							background-color: $red-1-color;
						}
					}

					&-bar {
						position: relative;
						height: 5px;
						width: 100px;
						border-radius: 4px;
						background-color: $light-2-color;
						z-index: 4;

						& div {
							position: absolute;
							left: 0;
							height: 100%;
							border-radius: 4px;
							transition: all 0.2s ease;
						}
					}
				}

				&-sent {
					color: $dark-3-color;
					&-value {
						font-weight: 700;
						color: $green-1-color;
					}
				}

				&-date {
					color: $dark-3-color;
				}

				&-fail {
					color: $dark-3-color;
					&-value {
						font-weight: 700;
						color: $red-1-color;
					}
				}
			}
		}
	}
	.loading {
		position: absolute;
	}

	.center {
		text-align: center;
	}
</style>
