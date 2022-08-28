<template>
	<div class="input-color">
		<div class="group">
			<input
				type="color"
				ref="input_color"
				v-model="color.color" />
			<div @click="toggleInputColor">
				{{ color.color.replace('#', '').toUpperCase() }}
			</div>
		</div>
		<div
			class="select-alpha"
			ref="alpha"
			@click="toggleInputAlpha">
			{{ color.alpha + '%' }}
		</div>
		<div
			class="showSelectAlpha"
			ref="input_alpha"
			v-show="showSelectAlpha">
			<input
				type="range"
				v-model="color.alpha"
				min="0"
				max="100" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vue-select-color',
		props: ['value'],
		data() {
			return {
				// color: '#FFFFFF',
				// render_color: 'FFFFFF',
				// alpha: '100',
				// render_alpha: '100%',
				showSelectAlpha: false,
			};
		},
		// watch: {
		// 	color() {
		// 		this.render_color = this.color.replace('#', '').toUpperCase();
		// 		let output = {
		// 			color: this.color,
		// 			alpha: this.alpha / 100,
		// 		};

		// 		this.$emit('input', output);
		// 	},
		// 	alpha() {
		// 		this.render_alpha = this.alpha + '%';
		// 		let output = {
		// 			color: this.color,
		// 			alpha: this.alpha / 100,
		// 		};

		// 		this.$emit('input', output);
		// 	},
		// },
		computed: {
			color: {
				get() {
					return this.value;
				},
				set(value) {
					let result = {
						color: value.color,
						alpha: value.alpha,
					};
					this.$emit('input', result);
				},
			},
		},
		methods: {
			toggleInputColor() {
				this.$refs.input_color.click();
			},
			toggleInputAlpha() {
				this.showSelectAlpha = !this.showSelectAlpha;
			},
			disbleInputAlpha(e) {
				if (
					!this.$refs.input_alpha.contains(e.target) &&
					!this.$refs.alpha.contains(e.target)
				) {
					this.showSelectAlpha = false;
				}
			},
		},
		mounted() {
			window.addEventListener('click', this.disbleInputAlpha);
		},
		beforeDestroy() {
			window.removeEventListener('click', this.disbleInputAlpha);
		},
	};
</script>

<style lang="scss" scoped>
	.input-color {
		height: 40px;
		position: relative;
		justify-content: space-between;
		width: 100%;
		font-weight: 400;
		font-size: 12px;
		line-height: 15px;
		border: 1px solid $light-1-color;
		border-radius: 4px;
		padding: 0;
	}
	.showSelectAlpha {
		position: absolute;
		padding: 11px 11px 8px 11px;
		background: $light-4-color;
		right: 0;
		bottom: 42px;
	}

	.group {
		display: flex;
		gap: 5px;
		align-items: center;
		padding: 11px;
		flex: 1;
	}

	.select-alpha {
		border-left: 1px solid $light-1-color;
		padding: 11px;
		cursor: pointer;
	}
</style>
