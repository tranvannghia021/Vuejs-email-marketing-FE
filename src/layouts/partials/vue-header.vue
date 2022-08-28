<template>
	<div class="vue-header">
		<button
			class="vue-header-bars"
			@click="handle_sidebar">
			<svg
				width="21"
				height="18"
				viewBox="0 0 21 18"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M20.4375 2.8125C20.7188 2.8125 21 2.57812 21 2.25V0.75C21 0.46875 20.7188 0.1875 20.4375 0.1875H0.5625C0.234375 0.1875 0 0.46875 0 0.75V2.25C0 2.57812 0.234375 2.8125 0.5625 2.8125H20.4375ZM20.4375 10.3125C20.7188 10.3125 21 10.0781 21 9.75V8.25C21 7.96875 20.7188 7.6875 20.4375 7.6875H0.5625C0.234375 7.6875 0 7.96875 0 8.25V9.75C0 10.0781 0.234375 10.3125 0.5625 10.3125H20.4375ZM20.4375 17.8125C20.7188 17.8125 21 17.5781 21 17.25V15.75C21 15.4688 20.7188 15.1875 20.4375 15.1875H0.5625C0.234375 15.1875 0 15.4688 0 15.75V17.25C0 17.5781 0.234375 17.8125 0.5625 17.8125H20.4375Z"
					fill="currentColor" />
			</svg>
		</button>

		<div
			ref="vue_header_shop"
			class="vue-header-shop"
			@click="handle_menu">
			<div class="vue-header-shop-img">
				<svg
					width="12"
					height="15"
					viewBox="0 0 12 15"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10.4844 3.62109C10.4844 3.53906 10.4297 3.51172 10.3477 3.51172C10.293 3.51172 9.33594 3.48438 9.33594 3.48438C9.33594 3.48438 8.76172 2.91016 8.54297 2.69141V14.5312L11.9609 13.6562C11.9609 13.6562 10.4844 3.67578 10.4844 3.62109ZM7.75 2.69141C7.69531 2.52734 7.64062 2.36328 7.55859 2.19922C7.28516 1.65234 6.84766 1.35156 6.35547 1.35156C6.30078 1.35156 6.27344 1.37891 6.24609 1.37891C6.21875 1.35156 6.19141 1.35156 6.19141 1.32422C5.97266 1.07812 5.69922 0.96875 5.34375 0.96875C4.6875 0.996094 4.03125 1.46094 3.51172 2.30859C3.12891 2.91016 2.85547 3.64844 2.77344 4.22266C2.00781 4.46875 1.48828 4.63281 1.48828 4.63281C1.10547 4.76953 1.07812 4.76953 1.05078 5.125C1.02344 5.39844 0.0117188 13.1094 0.0117188 13.1094L8.26953 14.5312V2.55469C8.24219 2.55469 8.1875 2.55469 8.16016 2.58203C8.16016 2.58203 7.99609 2.60938 7.75 2.69141ZM6.24609 3.15625C5.80859 3.29297 5.31641 3.45703 4.85156 3.59375C4.98828 3.07422 5.23438 2.55469 5.5625 2.22656C5.67188 2.08984 5.83594 1.95312 6.02734 1.87109C6.21875 2.25391 6.24609 2.80078 6.24609 3.15625ZM5.34375 1.43359C5.48047 1.43359 5.61719 1.46094 5.75391 1.51562C5.5625 1.625 5.39844 1.76172 5.23438 1.92578C4.79688 2.36328 4.49609 3.07422 4.35938 3.73047C3.97656 3.86719 3.56641 3.97656 3.21094 4.08594C3.45703 3.04688 4.33203 1.46094 5.34375 1.43359ZM4.08594 7.44922C4.11328 8.16016 5.97266 8.29688 6.08203 9.96484C6.16406 11.25 5.39844 12.1523 4.27734 12.207C2.9375 12.2891 2.22656 11.5234 2.22656 11.5234L2.5 10.3203C2.5 10.3203 3.23828 10.8672 3.8125 10.8125C4.19531 10.8125 4.35938 10.4844 4.33203 10.2656C4.27734 9.33594 2.77344 9.39062 2.66406 7.88672C2.58203 6.62891 3.42969 5.34375 5.26172 5.20703C5.97266 5.17969 6.32812 5.34375 6.32812 5.34375L5.91797 6.92969C5.91797 6.92969 5.45312 6.71094 4.87891 6.73828C4.08594 6.79297 4.05859 7.3125 4.08594 7.44922ZM6.68359 3.01953C6.68359 2.69141 6.62891 2.22656 6.49219 1.84375C6.98438 1.92578 7.23047 2.5 7.33984 2.82812C7.14844 2.88281 6.92969 2.96484 6.68359 3.01953Z"
						fill="currentColor" />
				</svg>
			</div>
			<span>{{ user ? user?.name : '' }}</span>
			<div class="vue-header-shop-icon">
				<svg
					width="9"
					height="5"
					viewBox="0 0 9 5"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M4.53906 4.65625C4.65625 4.77344 4.82031 4.77344 4.9375 4.65625L8.40625 1.21094C8.52344 1.11719 8.52344 0.929688 8.40625 0.8125L7.9375 0.367188C7.84375 0.25 7.65625 0.25 7.53906 0.367188L4.75 3.13281L1.9375 0.367188C1.82031 0.25 1.65625 0.25 1.53906 0.367188L1.07031 0.8125C0.953125 0.929688 0.953125 1.11719 1.07031 1.21094L4.53906 4.65625Z"
						fill="currentColor" />
				</svg>
			</div>

			<ul
				ref="vue_header_shop_menu"
				class="vue-header-shop-menu"
				:class="{ show: is_show }">
				<li>
					<a
						:href="`https://${user?.shopify_domain}/admin`"
						target="_blank"
						rel="noopener noreferrer">
						<svg
							width="12"
							height="15"
							viewBox="0 0 12 15"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4844 3.62109C10.4844 3.53906 10.4297 3.51172 10.3477 3.51172C10.293 3.51172 9.33594 3.48438 9.33594 3.48438C9.33594 3.48438 8.76172 2.91016 8.54297 2.69141V14.5312L11.9609 13.6562C11.9609 13.6562 10.4844 3.67578 10.4844 3.62109ZM7.75 2.69141C7.69531 2.52734 7.64062 2.36328 7.55859 2.19922C7.28516 1.65234 6.84766 1.35156 6.35547 1.35156C6.30078 1.35156 6.27344 1.37891 6.24609 1.37891C6.21875 1.35156 6.19141 1.35156 6.19141 1.32422C5.97266 1.07812 5.69922 0.96875 5.34375 0.96875C4.6875 0.996094 4.03125 1.46094 3.51172 2.30859C3.12891 2.91016 2.85547 3.64844 2.77344 4.22266C2.00781 4.46875 1.48828 4.63281 1.48828 4.63281C1.10547 4.76953 1.07812 4.76953 1.05078 5.125C1.02344 5.39844 0.0117188 13.1094 0.0117188 13.1094L8.26953 14.5312V2.55469C8.24219 2.55469 8.1875 2.55469 8.16016 2.58203C8.16016 2.58203 7.99609 2.60938 7.75 2.69141ZM6.24609 3.15625C5.80859 3.29297 5.31641 3.45703 4.85156 3.59375C4.98828 3.07422 5.23438 2.55469 5.5625 2.22656C5.67188 2.08984 5.83594 1.95312 6.02734 1.87109C6.21875 2.25391 6.24609 2.80078 6.24609 3.15625ZM5.34375 1.43359C5.48047 1.43359 5.61719 1.46094 5.75391 1.51562C5.5625 1.625 5.39844 1.76172 5.23438 1.92578C4.79688 2.36328 4.49609 3.07422 4.35938 3.73047C3.97656 3.86719 3.56641 3.97656 3.21094 4.08594C3.45703 3.04688 4.33203 1.46094 5.34375 1.43359ZM4.08594 7.44922C4.11328 8.16016 5.97266 8.29688 6.08203 9.96484C6.16406 11.25 5.39844 12.1523 4.27734 12.207C2.9375 12.2891 2.22656 11.5234 2.22656 11.5234L2.5 10.3203C2.5 10.3203 3.23828 10.8672 3.8125 10.8125C4.19531 10.8125 4.35938 10.4844 4.33203 10.2656C4.27734 9.33594 2.77344 9.39062 2.66406 7.88672C2.58203 6.62891 3.42969 5.34375 5.26172 5.20703C5.97266 5.17969 6.32812 5.34375 6.32812 5.34375L5.91797 6.92969C5.91797 6.92969 5.45312 6.71094 4.87891 6.73828C4.08594 6.79297 4.05859 7.3125 4.08594 7.44922ZM6.68359 3.01953C6.68359 2.69141 6.62891 2.22656 6.49219 1.84375C6.98438 1.92578 7.23047 2.5 7.33984 2.82812C7.14844 2.88281 6.92969 2.96484 6.68359 3.01953Z"
								fill="currentColor" />
						</svg>
						<span>Back to Shopify</span>
					</a>
				</li>
				<li>
					<a
						@click.prevent="handle_logout"
						class="error">
						<svg
							width="14"
							height="13"
							viewBox="0 0 14 13"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M4.59375 11.5625H2.625C1.88672 11.5625 1.3125 10.9883 1.3125 10.25V3.25C1.3125 2.53906 1.88672 1.9375 2.625 1.9375H4.59375C4.94922 1.9375 5.25 1.66406 5.25 1.28125C5.25 0.925781 4.94922 0.625 4.59375 0.625H2.625C1.14844 0.625 0 1.80078 0 3.25V10.25C0 11.7266 1.14844 12.875 2.625 12.875H4.59375C4.94922 12.875 5.25 12.6016 5.25 12.2188C5.25 11.8633 4.94922 11.5625 4.59375 11.5625ZM13.7539 6.28516L9.59766 2.62109C9.32422 2.375 8.94141 2.32031 8.61328 2.45703C8.28516 2.62109 8.09375 2.92188 8.09375 3.27734V4.80859H4.8125C4.18359 4.80859 3.71875 5.27344 3.71875 5.90234V7.65234C3.71875 8.25391 4.18359 8.74609 4.8125 8.74609H8.09375V10.25C8.09375 10.6055 8.28516 10.9062 8.61328 11.0703C8.72266 11.125 8.85938 11.1523 8.99609 11.1523C9.21484 11.1523 9.43359 11.0703 9.59766 10.9062L13.7539 7.26953C13.918 7.13281 14 6.96875 14 6.77734C14 6.58594 13.918 6.42188 13.7539 6.28516ZM9.40625 9.32031V7.40625H5.03125V6.09375H9.40625V4.17969L12.332 6.75L9.40625 9.32031Z"
								fill="currentColor" />
						</svg>

						<span>Logout</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		name: 'VueHeader',
		data() {
			return {
				is_show: false,
			};
		},
		computed: {
			...mapState('auth', ['user']),
		},
		methods: {
			...mapActions('auth', ['logout']),
			...mapActions('notification', ['add']),
			// SHOW/HIDE MENU IN HEADER
			handle_menu() {
				this.is_show = !this.is_show;
			},
			// SHOW/HIDE SIDEBAR
			handle_sidebar() {
				this.$store.commit('TOGGLE_SIDEBAR');
			},
			disableDropdown(event) {
				let target = event.target;
				if (
					!this.$refs.vue_header_shop.contains(target) &&
					!this.$refs.vue_header_shop_menu.contains(target)
				) {
					this.is_show = false;
				}
			},
			// HANDLE LOGOUT
			async handle_logout() {
				try {
					this.handle_menu();
					const { success, message } = await this.logout();
					if (success) {
						this.$router.push({
							name: 'Login',
						});
						this.add({
							type: 'success',
							message,
						});
					}
				} catch (error) {
					console.log(error);
				}
			},
		},
		mounted() {
			window.addEventListener('click', this.disableDropdown);
		},
		beforeDestroy() {
			window.removeEventListener('click', this.disableDropdown);
		},
	};
</script>

<style lang="scss" scoped>
	.vue-header {
		width: 100%;
		height: 65px;
		padding: 0 25px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08),
			0px 0.5px 2px rgba(96, 97, 112, 0.16);
		z-index: 99;

		&-bars {
			color: $dark-3-color;
		}

		&-shop {
			position: relative;
			display: flex;
			align-items: center;
			gap: 6px;
			padding-left: 22px;
			border-left: 1px solid $light-1-color;
			height: 100%;
			cursor: pointer;
			user-select: none;

			&-img {
				width: 32px;
				height: 32px;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #95bf47;
				color: $white-color;
			}

			& > span {
				user-select: none;
				max-width: 86px;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			&-icon {
				display: flex;
				align-items: center;
			}

			&-menu {
				list-style: none;
				width: 200px;
				position: absolute;
				right: -15px;
				top: calc(100% - 10px);
				background: $white-color;
				border-radius: 4px;
				border: 1px solid $light-1-color;
				opacity: 0;
				visibility: hidden;
				transition: all 0.2s ease-in;
				z-index: 10;
				box-shadow: 0px -3px 8px rgba(40, 41, 61, 0.04),
					-5px 16px 24px rgba(96, 97, 112, 0.16);

				&::before {
					content: '';
					position: absolute;
					width: 10px;
					height: 10px;
					border-top: 1px solid $light-1-color;
					border-right: 1px solid $light-1-color;
					background-color: $white-color;
					right: 24px;
					top: 4px;
					transform: rotate(-45deg) translateY(-14px);
					z-index: 9;
				}

				&.show {
					opacity: 1;
					visibility: visible;
				}

				& a {
					position: relative;
					padding: 6px 0px 10px 14px;
					width: 100%;
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-size: 1.4rem;
					font-weight: 500;
					line-height: 2.4rem;
					transition: all 0.2s ease;
					z-index: 11;
					&.error {
						color: $red-1-color;
					}
				}
			}
		}
	}

	li {
		padding: 4px 0;
		position: relative;
		z-index: 10;
		&:hover {
			background-color: $light-1-color;
		}
	}
</style>
