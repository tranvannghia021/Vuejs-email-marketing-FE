<template>
	<tr>
		<td>
			<div class="vue-campaign-content-table-name">
				<div class="vue-campaign-content-table-name-icon">
					<svg
						width="13"
						height="14"
						viewBox="0 0 13 14"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M12.5176 4.76367C11.8828 4.28125 11.375 3.875 8.35352 1.69141C7.92188 1.38672 7.08398 0.625 6.5 0.625H6.47461C5.89062 0.625 5.05273 1.38672 4.62109 1.69141C1.59961 3.875 1.0918 4.25586 0.457031 4.76367C0.152344 4.99219 0 5.34766 0 5.72852V12.4062C0 13.0918 0.533203 13.625 1.21875 13.625H11.7812C12.4414 13.625 13 13.0918 13 12.4316V5.72852C13 5.34766 12.8223 4.99219 12.5176 4.76367ZM7.69336 9.96875C7.33789 10.248 6.90625 10.375 6.5 10.375C6.06836 10.375 5.63672 10.248 5.28125 9.96875L1.625 7.09961V5.93164C2.1582 5.5 2.79297 5.01758 5.58594 2.98633C5.66211 2.93555 5.76367 2.85938 5.86523 2.7832C5.99219 2.68164 6.27148 2.45312 6.5 2.32617C6.70312 2.45312 6.98242 2.68164 7.10938 2.7832C7.21094 2.85938 7.3125 2.93555 7.38867 3.01172C10.1562 5.01758 10.8164 5.5 11.375 5.93164V7.09961L7.69336 9.96875Z"
							fill="currentColor" />
					</svg>
				</div>
				<div class="vue-campaign-content-table-name-title">
					<span>
						{{ campaign.name }}
					</span>
				</div>
			</div>
		</td>
		<td>
			<div class="vue-campaign-content-table-date">
				{{ date_create }}
			</div>
		</td>
		<td>
			<div
				class="vue-campaign-content-table-status"
				:class="{
					running: !status,
					completed: status,
				}">
				{{ status ? 'Completed' : 'Running' }}
			</div>
		</td>
		<td>
			<div
				class="vue-campaign-content-table-progress"
				:class="{
					running: !status,
					completed: status,
				}">
				<span>{{ progress }}%</span>
				<div class="vue-campaign-content-table-progress-bar">
					<div
						:style="{
							width: progress + '%',
						}"></div>
				</div>
			</div>
		</td>
		<td>{{ campaign.total.toLocaleString('en-US') }}</td>
		<td class="vue-campaign-content-table-sent">
			<span class="vue-campaign-content-table-sent-value">{{
				campaign.sended
			}}</span>
			({{ sended }}%)
		</td>
		<td class="vue-campaign-content-table-fail">
			<span class="vue-campaign-content-table-fail-value">{{
				campaign.failed
			}}</span>
			({{ failed }}%)
		</td>
	</tr>
</template>

<script>
	export default {
		name: 'campaign-item',
		props: ['campaign'],
		computed: {
			status() {
				return (
					this.campaign.sended + this.campaign.failed ===
					this.campaign.total
				);
			},
			progress() {
				return Math.round(
					((this.campaign.sended + this.campaign.failed) /
						this.campaign.total) *
						100
				);
			},
			sended() {
				return Math.round(
					(this.campaign.sended / this.campaign.total) * 100
				);
			},
			failed() {
				return Math.round(
					(this.campaign.failed / this.campaign.total) * 100
				);
			},
			date_create() {
				return new Date(this.campaign.created_at).toLocaleString(
					'en-US',
					{
						day: 'numeric',
						year: 'numeric',
						month: 'short',
					}
				);
			},
		},
	};
</script>

<style lang="scss" scoped></style>
