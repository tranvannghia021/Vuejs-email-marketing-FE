<template>
	<div
		@click="handleFocusInput"
		class="input-group">
		<div
			class="input"
			:class="{
				'input-size-big': size == 'big',
				'input-size-small': size == 'small',
				'input-invalid': is_validate,
			}">
			<slot name="content-left"></slot>
			<input
				ref="input_value"
				@select="handleSelected"
				@blur="handleBlur"
				@keypress="handleKeyPress"
				type="text"
				:placeholder="placeholder"
				v-model="data"
				:maxlength="length"
				:style="{
					width: width,
				}"
				id="inputElement" />

			<slot name="content-right"></slot>
			<span
				class="length-value"
				v-if="length"
				>{{ this.data.length }} / {{ this.length }}</span
			>
		</div>
		<span
			v-show="is_validate"
			class="text-danger"
			>Input is empty</span
		>
	</div>
</template>

<script>
	export default {
		name: 'vue-input',
		props: {
			value: {
				type: String,
			},
			size: {
				type: String,
				default: '',
			},
			placeholder: {
				type: String,
				default: '',
			},
			validate: {
				type: Boolean,
				default: false,
			},
			width: {
				type: String,
				default: '',
			},
			length: {
				type: Number,
			},
		},
		data() {
			return {
				is_validate: false,
				selectedStart: '',
				selectedEnd: '',
				pivot: false,
			};
		},
		computed: {
			data: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				},
			},
			currentCursorr() {
				return this.cursorCurrent;
			},
		},
		watch: {
			validate() {
				this.is_validate = this.validate;
			},
			data() {
				if (!this.data) {
					this.pivot = false;
				}
			},
		},
		methods: {
			handleBlur(e) {
				this.selectedStart = e.target.selectionStart;
				this.selectedEnd = e.target.selectionEnd;
			},
			handleSelected(e) {
				this.selectedStart = e.target.selectionStart;
				this.selectedEnd = e.target.selectionEnd;
			},
			handleKeyPress(e) {
				if (e.keyCode != 32 && e.which != 32) {
					this.pivot = true;
				}
				if (!this.pivot) {
					if (e.keyCode == 32 && e.which == 32) {
						e.preventDefault();
					}
				}
			},
			handleFocusInput() {
				this.$refs.input_value.focus();
			},
		},
		created() {
			this.is_validate = this.validate;
		},
	};
</script>

<style lang="scss" scoped>
	.length-value {
		font-weight: 400;
		font-size: 1.4rem;
		line-height: 17px;
		color: $dark-3-color;
		position: relative;

		&::before {
			content: '';
			position: absolute;
			width: 1px;
			height: 22px;
			background-color: $light-1-color;
			top: 50%;
			transform: translateY(-50%);
			left: -13px;
		}
	}
</style>
