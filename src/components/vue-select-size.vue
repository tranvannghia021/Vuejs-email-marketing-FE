<template>
	<div class="input-size">
		<input
			class="input-value"
			type="number"
			v-model="input.size" />

		<select
			v-model="input.unit"
			class="input-unit">
			<option value="px">px</option>
			<option value="%">%</option>
			<option value="rem">rem</option>
			<option value="em">em</option>
		</select>
	</div>
</template>

<script>
	export default {
		name: 'vue-select-size',
		props: ['value'],
		computed: {
			input: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('inpupt', {
						size: value.size,
						unit: value.unit,
					});
				},
			},
		},
	};
</script>

<style lang="scss" scoped>
	.input {
		&-size {
			border: 1px solid $light-1-color;
			display: flex;
			background: $light-4-color;
			border-radius: 4px;
			width: 100%;
			height: 40px;
		}
		&-value {
			font-size: 1.2rem;
			padding-right: 19px;
			padding: 11px;
			flex: 1;
			width: 100%;
		}

		&-unit {
			font-weight: 400;
			font-size: 1.2rem;
			color: $dark-0-color;
			line-height: 15px;
			padding: 11px;
			border-left: 1px solid $light-1-color;
			cursor: pointer;
		}
	}
</style>
