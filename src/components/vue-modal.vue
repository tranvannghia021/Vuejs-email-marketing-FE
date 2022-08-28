<template>
	<div
		class="vue-modal"
		:class="{ 'is-active': visible }"
		@click.self="onClickBackdrop">
		<div
			class="vue-modal-wrap"
			:style="{
				'max-width': width,
				width: width ? '100%	' : 'auto',
			}"
			:class="{
				'f-height': full_height,
			}">
			<div class="vue-modal-header">
				<slot name="header"></slot>
				<div
					class="vue-modal-close"
					v-if="closeable"
					@click="onClickClose">
					<svg
						width="8"
						height="8"
						viewBox="0 0 10 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1 1L5 4.99931L9 1L1 9L5.00033 5L9 9"
							stroke="#555770"
							stroke-linecap="round"
							stroke-linejoin="round" />
					</svg>
				</div>
			</div>
			<div
				class="vue-modal-body"
				ref="body">
				<slot></slot>
			</div>
			<div
				class="vue-modal-footer"
				ref="footer"
				v-if="visible_footer">
				<h3>This is footer</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vue-modal',
		props: {
			value: {
				type: [Boolean],
			},
			width: {
				type: String,
			},
			closeable: {
				type: [Boolean],
				default: true,
			},
			backdrop: {
				type: [Boolean],
				default: true,
			},
			full_height: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				visible_footer: false,
			};
		},
		computed: {
			visible: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
		},
		methods: {
			hideModal() {
				this.visible = false;
			},
			keyUpHideModal(e) {
				if (e.key == 'Escape') {
					this.hideModal();
				}
			},
			onClickBackdrop() {
				if (this.backdrop) {
					this.hideModal();
				}
			},
			onClickClose() {
				if (this.closeable) {
					this.hideModal();
				}
			},
			async onClickVisible() {
				this.visible_footer = true;
				await this.$nextTick();
			},
		},
		mounted() {
			let body = document.querySelector('body');
			body.appendChild(this.$el);
			window.addEventListener('keyup', this.keyUpHideModal);
		},
		beforeDestroy() {
			this.$el.remove();
			window.removeEventListener('keyup', this.keyUpHideModal);
		},
	};
</script>

<style lang="scss" scoped>
	.vue-modal {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.8);
		transition: all 0.3s ease;
		opacity: 0;
		visibility: hidden;
		text-align: center;
		overflow: hidden auto;
		&:before {
			display: inline-block;
			width: 0;
			height: 100%;
			vertical-align: middle;
			content: '';
		}
		&.is-active {
			opacity: 1;
			visibility: visible;
		}
		&-wrap {
			max-height: calc(100% - 40px);
			top: 0;
			display: inline-flex;
			flex-direction: column;
			vertical-align: middle;
			width: 400px;
			background: $light-4-color;
			text-align: left;
			border-radius: 16px;
			padding: 0;
			overflow: hidden;
		}
		&-header {
			position: relative;
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		&-body {
			min-height: 20px;
			overflow: hidden;
			display: flex;
			flex: 1;
			flex-direction: column;
		}
		&-footer {
			border-top: 1px solid #ccc;
		}
		&-close {
			position: absolute;
			top: 24px;
			right: 22px;
			z-index: 1;
			cursor: pointer;
			opacity: 0.9;
			&:hover {
				opacity: 1;
			}
		}
	}

	.f-height {
		height: 100%;
	}
</style>
