<template>
	<div
		class="vue-sidebar"
		ref="sidebar"
		:class="{ 'is-hide': !is_show }">
		<router-link
			:to="{ name: 'Customer' }"
			class="vue-sidebar-logo">
			<div class="vue-sidebar-logo-img">
				<img
					src="@/assets/images/logo-img.png"
					alt="Logo" />
			</div>
			<div class="vue-sidebar-logo-text">
				<img
					src="@/assets/images/logo-text.png"
					alt="Logo" />
			</div>
		</router-link>
		<ul class="vue-sidebar-menu">
			<li
				v-for="item in options"
				:key="item.id"
				:class="{ 'is-active': setActive(item.id) }">
				<router-link :to="{ name: item.route }">
					<img
						:src="item.icon"
						alt="icon" />
					<span>{{ item.text }}</span>
				</router-link>
				<span
					v-if="!is_show"
					class="vue-sidebar-menu-tooltip"
					>{{ item.text }}</span
				>
			</li>
		</ul>
		<div class="vue-sidebar-bottom">
			<a
				class="vue-sidebar-bottom-link"
				href="#">
				<img
					src="@/assets/icons/headphone.svg"
					alt="icon head phone" />
				<span>Help center</span>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Sidebar',
		data() {
			return {
				options: [
					{
						id: 'Customer',
						route: 'Customer',
						text: 'Customer',
						icon: require('@/assets/icons/user.svg'),
					},
					{
						id: 'Campaign',
						route: 'Campaign',
						text: 'Campaign',
						icon: require('@/assets/icons/mail.svg'),
					},
				],
				modules: {
					Customer: ['Customer'],
					Campaign: ['Campaign', 'CreateCampaign'],
				},
			};
		},
		computed: {
			is_show() {
				return this.$store.state.is_show_sidebar;
			},
		},
		methods: {
			// HANDLE ACTIVE CLASS
			setActive(key) {
				let nameRouter = this.$route.name;
				if (this.modules[key].includes(nameRouter)) {
					return true;
				}
				return false;
			},
		},
		mounted() {},
	};
</script>

<style lang="scss" scoped>
	.vue-sidebar {
		width: 230px;
		display: flex;
		flex-direction: column;
		background: linear-gradient(138.19deg, #003084 4.98%, #0294d7 100%);
		transition: all 0.3s ease-in-out;

		&.is-hide {
			width: 66px;

			& .vue-sidebar-logo {
				padding: 20px 14px;
				justify-content: left;

				&-text {
					display: none;
				}
			}

			& .vue-sidebar-menu {
				& a {
					& span {
						display: none;
					}
				}
			}

			& .vue-sidebar-bottom {
				& span {
					display: none;
				}
			}
		}

		&-logo {
			padding: 20px;
			display: flex;
			align-items: center;
			gap: 14px;
			transition: all 0.2s ease-in;
			&-img {
				height: 40px;
				object-fit: cover;
			}

			&-text {
				width: 132px;
			}
		}

		&-menu {
			list-style-type: none;

			padding: 0;
			li {
				position: relative;
				a {
					position: relative;
					padding: 13px 0 13px 20px;
					text-decoration: none;
					display: flex;
					align-items: center;
					justify-content: left;
					column-gap: 12px;
					font-weight: 400;
					font-size: 1.4rem;
					line-height: 2.4rem;
					height: 50px;
					transition: all 0.2s ease;
					color: $white-color;
					opacity: 0.5;

					&:hover {
						opacity: 1;
					}
				}
				&.is-active {
					a {
						background-color: rgba(255, 255, 255, 0.1);
						opacity: 1;

						&::before {
							content: '';
							position: absolute;
							left: 0;
							top: 0;
							width: 5px;
							height: 100%;
							background-color: $yellow-2-color;
							border-radius: 0px 3px 3px 0px;
						}
					}
				}

				&:hover {
					& .vue-sidebar-menu-tooltip {
						visibility: visible;
						opacity: 0.9;
					}
				}
			}
			&-tooltip {
				min-width: 88px;
				background-color: $bg-tooltip-color;
				color: $white-color;
				text-align: center;
				border-radius: 4px;
				padding: 6px 10px;

				/* Position the tooltip */
				position: absolute;
				top: 50%;
				right: -140%;
				z-index: 1;
				transform: translateY(-50%);
				visibility: hidden;
				transition: all 0.2s ease-in;
				opacity: 0;

				&::after {
					content: '';
					position: absolute;
					width: 10px;
					height: 10px;
					border-top: 5px solid transparent;
					border-bottom: 5px solid $bg-tooltip-color;
					border-left: 5px solid $bg-tooltip-color;
					border-right: 5px solid transparent;
					left: -3px;
					top: 50%;
					transform: translateY(-50%) rotate(45deg);
					background-color: $bg-tooltip-color;
				}
			}
		}

		&-bottom {
			margin-top: auto;

			&-link {
				padding-left: 20px;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: left;
				column-gap: 12px;
				font-weight: 400;
				font-size: 1.4rem;
				line-height: 2.4rem;
				transition: all 0.2s ease;
				color: $white-color;
				opacity: 0.5;

				& span {
					white-space: nowrap;
				}
			}
		}
	}
</style>
