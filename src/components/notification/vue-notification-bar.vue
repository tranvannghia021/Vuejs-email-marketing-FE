<template>
	<div class="notification-bar">
		<button
			class="notification-bar-close"
			@click="close_noti">
			<svg
				width="8"
				height="8"
				viewBox="0 0 8 8"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M7.75 1.08333L6.91667 0.25L4 3.16667L1.08333 0.25L0.25 1.08333L3.16667 4L0.25 6.91667L1.08333 7.75L4 4.83333L6.91667 7.75L7.75 6.91667L4.83333 4L7.75 1.08333Z"
					fill="currentColor" />
			</svg>
		</button>
		<div
			class="notification-bar-header"
			:class="{ error: notification.type == 'error' }">
			<template v-if="notification.type === 'success'">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 0.145874C4.64844 0.145874 0.3125 4.52087 0.3125 9.83337C0.3125 15.1849 4.64844 19.5209 10 19.5209C15.3125 19.5209 19.6875 15.1849 19.6875 9.83337C19.6875 4.52087 15.3125 0.145874 10 0.145874ZM10 18.2709C5.35156 18.2709 1.5625 14.5209 1.5625 9.83337C1.5625 5.224 5.3125 1.39587 10 1.39587C14.6094 1.39587 18.4375 5.18494 18.4375 9.83337C18.4375 14.4818 14.6484 18.2709 10 18.2709ZM15.5078 7.56775C15.7031 7.37244 15.7031 7.05994 15.5078 6.90369L15.1953 6.55212C15 6.35681 14.6875 6.35681 14.5312 6.55212L8.125 12.8802L5.42969 10.1849C5.27344 9.98962 4.96094 9.98962 4.76562 10.1849L4.45312 10.4974C4.25781 10.6927 4.25781 10.9662 4.45312 11.1615L7.8125 14.5599C7.96875 14.7162 8.28125 14.7162 8.47656 14.5599L15.5078 7.56775Z"
						fill="currentColor" />
				</svg>
				<span>Success</span>
			</template>
			<template v-else>
				<svg
					width="20"
					height="20"
					xmlns="http://www.w3.org/2000/svg"
					enable-background="new 0 0 24 24"
					viewBox="0 0 24 24"
					fill="currentColor">
					<path
						d="M12.0119629,2.0039062C6.491272,2.0006104,2.0131836,6.4733276,2.0098877,11.9940186S6.4793091,21.9927979,12,21.9960938c2.6522827,0.0043335,5.1970215-1.0482178,7.0712891-2.9248047c1.875-1.8734131,2.9291992-4.4147949,2.9307861-7.0653076C22.0053711,6.4852905,17.5326538,2.0072021,12.0119629,2.0039062z M12.0122681,20.9960938c-4.9684448,0.0033569-8.9988403-4.0215454-9.0022583-8.9899902C3.0066528,7.0377197,7.0316162,3.0072632,12,3.0039062c2.387085-0.0042725,4.6774292,0.9428711,6.3642578,2.6318359c1.687439,1.6858521,2.6363525,3.9728394,2.6379395,6.3581543C21.0056152,16.9622803,16.9806519,20.9926758,12.0122681,20.9960938z M12.7069702,12l3.1816406-3.1816406c0.1905518-0.194397,0.1905518-0.5054932,0-0.6998901c-0.1932373-0.1972046-0.5097656-0.2003784-0.7069702-0.0071411L12,11.2929688L8.8183594,8.1113892c-0.194397-0.1904907-0.5054932-0.1904907-0.6998901,0C7.9212646,8.3046265,7.9180908,8.6211548,8.1113281,8.8183594L11.2929688,12l-3.1816406,3.1816406c-0.09375,0.09375-0.1463623,0.2208862-0.1464233,0.3534546c0,0.276123,0.2238159,0.5,0.499939,0.500061c0.1326294,0.0001831,0.2598877-0.0525513,0.3535156-0.1464844L12,12.7070312l3.1816406,3.1816406c0.0936279,0.0939331,0.2208862,0.1466675,0.3535156,0.1464844v0.000061c0.1325684-0.000061,0.2596436-0.0527344,0.3533936-0.1464233c0.1953125-0.1952515,0.1953125-0.5118408,0.000061-0.7071533L12.7069702,12z" />
				</svg>
				<span>Error</span>
			</template>
		</div>
		<div class="notification-bar-message">{{ notification.message }}</div>
	</div>
</template>

<script>
	import vueButton from '../vue-button.vue';
	import { mapActions } from 'vuex';
	export default {
		components: { vueButton },
		name: 'VueNotificationBar',
		props: {
			notification: {
				type: Object,
				require: true,
			},
		},
		data() {
			return {
				timeout: null,
			};
		},
		methods: {
			...mapActions('notification', ['delete']),
			close_noti() {
				this.delete(this.notification.id);
			},
		},
		mounted() {
			this.timeout = setTimeout(
				() => this.delete(this.notification.id),
				5000
			);
		},
		beforeDestroy() {
			clearTimeout(this.timeout);
		},
	};
</script>

<style lang="scss" scoped>
	.notification-bar {
		position: relative;
		width: 300px;
		padding: 18px 24px 30px;
		margin-bottom: 12px;
		background-color: $white-color;
		box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		row-gap: 8px;
		&-close {
			position: absolute;
			top: 10px;
			right: 10px;
		}
		&-header {
			color: $success-color;
			display: flex;
			align-items: center;
			align-items: left;
			column-gap: 8px;

			&.error {
				color: $red-1-color;
			}

			& span {
				font-weight: 600;
			}
		}

		&-message {
			margin-left: 28px;
			font-size: 12px;
		}
	}
</style>
