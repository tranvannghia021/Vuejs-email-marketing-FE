<template>
	<component
		:is="type"
		@click="onClick"
		class="btn"
		:to="to"
		:href="href"
		:class="{ 'btn-disabled': disabled }"
		:disabled="disabled || is_loading">
		<template v-if="!is_loading">
			<slot name="button-icon"></slot>
			<slot></slot>
		</template>
		<template v-else>
			<div class="btn-loading"></div>
		</template>
	</component>
</template>

<script>
	export default {
		name: 'vue-button',
		props: {
			disabled: {
				type: Boolean,
				default: false,
			},
			icon_right: {
				type: Boolean,
				default: false,
			},
			to: {
				type: Object,
			},
			href: {
				type: String,
			},
			is_loading: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			type() {
				return this.to
					? this.elements('to')
					: this.href
					? this.elements('href')
					: this.elements();
			},
		},
		methods: {
			onClick(clicked) {
				if (this.disabled) {
					return;
				}
				this.$emit('clicked', clicked);
			},
			elements(which) {
				const tag = {
					to: 'router-link',
					href: 'a',
				};
				if (this.disabled) {
					return 'button';
				}

				return tag[which] || 'button';
			},
			onMouseOver(e) {
				this.$emit('mouseovered', e);
			},
			onMouseOut(e) {
				this.$emit('mouseouted', e);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn {
		position: relative;
		padding: 8px 16px;
		font-weight: 500;
		font-size: 1.4rem;
		line-height: 1.8rem;
		color: $dark-2-color;
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: center;
		border-radius: 3px;
		cursor: pointer;

		&-no-radius {
			border-radius: 0;
		}
		&-primary {
			background-color: $sapphire-blue-color;
			color: $light-4-color;
		}

		&-outline {
			background-color: $light-4-color;
			color: $dark-2-color;
			border: 1px solid $light-1-color;
		}

		&-tranparent {
			border: 0;
			background: transparent;
		}

		&-full-width {
			padding: 12px 0;
			font-weight: 700;
			font-size: 1.6rem;
			line-height: 2.4rem;
			width: 100%;
		}

		&-small {
			padding: 6px 20px;
			line-height: 22px;
		}

		&-no-border {
			border: none;
		}

		&-icon-right {
			flex-direction: row-reverse;
		}
		&-text-primary {
			color: $primary-color;
		}
		&-text-error {
			color: $red-1-color;
		}
		&-no-padding {
			padding: 0;
		}

		&-loading {
			display: inline-block;
			width: 24px;
			height: 24px;
			border: 3px solid $white-color;
			border-radius: 50%;
			border-top-color: $primary-color;
			animation: spin 1s ease-in-out infinite;
			-webkit-animation: spin 1s ease-in-out infinite;
		}

		&:hover {
			opacity: 0.8;
			transition: all 0.2s ease-in;
		}
		&-disabled {
			opacity: 0.8;
			cursor: not-allowed;
		}
		&:disabled {
			opacity: 0.8;
			cursor: not-allowed;
		}
	}
</style>
