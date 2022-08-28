<template>
	<div
		class="vue-dropdown"
		ref="dropdown">
		<div
			class="vue-dropdown-title"
			@click="toggleDropdown(!show)"
			ref="dropdown__title">
			<slot name="dropdown-button"></slot>
		</div>
		<div
			class="vue-dropdown-body"
			v-show="show"
			ref="dropdown__body"
			:class="[{ 'full-width': full_width }]">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vue-dropdown',
		props: ['full_width', 'move_out', 'border_color', 'position'],
		data() {
			return {
				show: false,
			};
		},
		methods: {
			toggleDropdown(value) {
				this.show = value;
			},
			disableDropdown(event) {
				let target = event.target;
				if (
					!this.$refs.dropdown__title.contains(target) &&
					!this.$refs.dropdown__body.contains(target)
				) {
					this.show = false;
				}
			},
		},
		mounted() {
			window.addEventListener('click', this.disableDropdown);
			let dropdown = this.$refs.dropdown;
			let dropdown__body = this.$refs.dropdown__body;
			let heightDropdown = this.$refs.dropdown.offsetHeight;
			dropdown__body.style.top = `${heightDropdown + 1}px`;

			if (this.move_out) {
				dropdown.parentElement.appendChild(dropdown__body);
			}

			if (this.position == 'left') {
				dropdown__body.style.left = '0';
			} else if (this.position == 'right') {
				dropdown__body.style.right = '0';
			} else if (this.position == 'center') {
				dropdown__body.style.left = '50%';
				dropdown__body.style.transform = 'translateX(-50%)';
			}
		},
		beforeDestroy() {
			window.removeEventListener('click', this.disableDropdown);
		},
	};
</script>

<style lang="scss" scoped>
	.vue-dropdown {
		display: flex;
		align-items: center;
		position: relative;

		&-body {
			position: absolute;
			border: 1px solid #e4e6eb;
			background: #ffffff;
			border-radius: 3px;
			z-index: 1111;
			display: flex;
			align-items: center;
			-webkit-animation-name: fadeIn; /* Fade in the background */
			-webkit-animation-duration: 0.5s;
			animation-name: fadeIn;
			animation-duration: 0.3s;
			box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
			border-radius: 3px;
		}
	}

	.dropdown-range {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
		padding: 15px 14px 16px 12px;
		&-input {
			display: flex;
			column-gap: 8px;

			& input {
				flex: 1;
				padding: 8px 0 8px 10px;
				background: #fff;
				border: 1px solid $light-1-color;
				border-radius: 3px;
				max-width: 104px;

				&[type='date'] {
					max-width: 100%;
				}
			}
		}

		&-action {
			display: flex;
			justify-content: space-between;
			& button {
				border-radius: 4px !important;
			}
		}
	}

	.dropdown-radio {
		display: flex;
		flex-direction: column;
		row-gap: 18px;
		padding: 14px 20px 26px 13px;
		&-input {
			min-width: 177px;
			display: flex;
			flex-direction: column;
			row-gap: 16px;

			&-label {
				display: flex;
				align-items: center;
				column-gap: 8px;

				& input {
					width: 16px;
					height: 16px;
				}
			}
		}
	}

	.dropdown-checkbox {
		display: flex;
		flex-direction: column;
		row-gap: 18px;
		padding: 14px 13px 18px 13px;
		&-input {
			min-width: 150px;
			display: flex;
			flex-direction: column;
			row-gap: 16px;

			&-label {
				display: flex;
				align-items: center;
				column-gap: 8px;

				& input {
					width: 16px;
					height: 16px;
				}
			}
		}
	}
</style>
