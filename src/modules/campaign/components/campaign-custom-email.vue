<template>
	<div>
		<div
			class="card"
			ref="custom_email_header">
			<div
				class="card-header"
				@click="toggleCustomEmail">
				<h1 class="card-title">
					<svg
						width="14"
						height="18"
						viewBox="0 0 14 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14 7.75C14 7.77734 13.9727 7.80469 13.9727 7.83203C13.9727 8.84375 13.0703 9.5 12.0586 9.5H9.40625C8.66797 9.5 8.09375 10.1016 8.09375 10.8125C8.09375 10.9219 8.09375 11.0039 8.12109 11.0859C8.17578 11.3867 8.28516 11.6328 8.39453 11.9062C8.55859 12.2891 8.75 12.6719 8.75 13.0547C8.75 13.9297 8.14844 14.7227 7.27344 14.75C7.19141 14.75 7.08203 14.75 7 14.75C3.11719 14.75 0 11.6328 0 7.75C0 3.89453 3.11719 0.75 7 0.75C10.8555 0.75 14 3.89453 14 7.75ZM2.625 7.75C2.13281 7.75 1.75 8.16016 1.75 8.625C1.75 9.11719 2.13281 9.5 2.625 9.5C3.08984 9.5 3.5 9.11719 3.5 8.625C3.5 8.16016 3.08984 7.75 2.625 7.75ZM3.5 6C3.96484 6 4.375 5.61719 4.375 5.125C4.375 4.66016 3.96484 4.25 3.5 4.25C3.00781 4.25 2.625 4.66016 2.625 5.125C2.625 5.61719 3.00781 6 3.5 6ZM7 2.5C6.50781 2.5 6.125 2.91016 6.125 3.375C6.125 3.86719 6.50781 4.25 7 4.25C7.46484 4.25 7.875 3.86719 7.875 3.375C7.875 2.91016 7.46484 2.5 7 2.5ZM10.5 6C10.9648 6 11.375 5.61719 11.375 5.125C11.375 4.66016 10.9648 4.25 10.5 4.25C10.0078 4.25 9.625 4.66016 9.625 5.125C9.625 5.61719 10.0078 6 10.5 6Z"
							fill="#003084" />
					</svg>
					Customize email
				</h1>
				<span
					class="more"
					ref="icon_more">
				</span>
			</div>
		</div>
		<transition name="customize">
			<div
				v-if="toggle"
				class="custom_email">
				<div class="card bg-gray">
					<div class="card-title">Banner cover</div>
					<div class="card-row">
						<img
							v-show="input.preview_image"
							ref="preview_img"
							:src="input.preview_image"
							class="preview_img"
							alt="" />
						<span
							>Accept JPG, PNG, JPEG, GIF file with max size of
							5MB</span
						>
						<vue-button
							class="btn-primary"
							@clicked="handleUpImage"
							>Change</vue-button
						>
						<input
							type="file"
							v-show="false"
							ref="input_image"
							@change="handleImage" />
					</div>
				</div>
				<div class="card bg-gray">
					<div class="card-title">Background</div>
					<div class="flex flex-gap-20">
						<div class="flex flex-1 flex-column flex-gap-10">
							<label for="Background">Background color</label>
							<vue-select-color
								v-model="
									input.background.color
								"></vue-select-color>
						</div>
						<div class="flex flex-1 flex-column flex-gap-10">
							<label for="Background">Radius</label>
							<vue-select-size
								v-model="
									input.background.radius
								"></vue-select-size>
						</div>
					</div>
				</div>
				<div class="card bg-gray">
					<div class="card-title">Button</div>
					<div class="flex flex-gap-20">
						<div class="flex flex-1 flex-column flex-gap-10">
							<label for="Background">Label</label>
							<vue-input
								class="card-input"
								width="100%"
								size="small"
								v-model="input.button.label"
								placeholder="Enter your Label"></vue-input>
						</div>
						<div class="flex flex-1 flex-column flex-gap-10">
							<label for="Background">Radius</label>
							<vue-select-size
								v-model="input.button.radius"></vue-select-size>
						</div>
					</div>
					<div class="flex flex-gap-20">
						<div class="flex flex-1 flex-column flex-gap-10">
							<label for="Background">Background color</label>
							<vue-select-color
								v-model="
									input.button.background_color
								"></vue-select-color>
						</div>
						<div class="flex flex-1 flex-column flex-gap-10">
							<label for="Background">Text color</label>
							<vue-select-color
								v-model="
									input.button.text_color
								"></vue-select-color>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import VueSelectColor from '@/components/vue-select-color.vue';
	import VueSelectSize from '@/components/vue-select-size.vue';
	import VueInput from '@/components/vue-input.vue';
	import store from '@/store';
	import { mapMutations, mapState } from 'vuex';

	export default {
		name: 'campaign-custom-email',
		components: {
			VueButton,
			VueSelectColor,
			VueSelectSize,
			VueInput,
		},
		data() {
			return {
				toggle: false,
			};
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
			input: {
				get() {
					return this.new_campaign.email_custom;
				},
				set(value) {
					this.setEmailCustom(value);
				},
			},
			changeColorText() {
				let c = this.input.background.color.color.substring(1); // strip #
				let rgb = parseInt(c, 16); // convert rrggbb to decimal
				let r = (rgb >> 16) & 0xff; // extract red
				let g = (rgb >> 8) & 0xff; // extract green
				let b = (rgb >> 0) & 0xff; // extract blue

				let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

				if (luma < 40) {
					return 'dark';
				}
				return 'light';
			},
		},
		watch: {
			changeColorText(value) {
				if (value === 'dark') {
					this.$store.commit('campaign/SET_TEXT_COLOR', '#ffffff');
				} else {
					this.$store.commit('campaign/SET_TEXT_COLOR', '#000000');
				}
			},
			toggle() {
				let icon_more = this.$refs.icon_more;
				if (this.toggle) {
					icon_more.style.transform = 'rotate(0)';
					this.$refs.custom_email_header.style.boxShadow = 'none';
				} else {
					icon_more.style.transform = 'rotate(-90deg)';
					this.$refs.custom_email_header.style.boxShadow =
						'0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)';
				}
			},
		},
		methods: {
			...mapMutations({
				setEmailCustom: 'campaign/SET_EMAIL_CUSTOM',
			}),
			toggleCustomEmail() {
				this.toggle = !this.toggle;
			},
			handleUpImage() {
				// toggle upload file image
				this.$refs.input_image.click();
			},
			handleImage(e) {
				if (e.target.files.length <= 0) {
					return;
				}
				// assign file image upload to const image
				const image = e.target.files[0];

				//list type image be allowed
				const typeImage = [
					'image/jpg',
					'image/png',
					'image/jpeg',
					'image/gif',
				];
				// check type file image choose upload
				if (!typeImage.includes(image.type)) {
					this.$refs.input_image.value = null;
					store.dispatch('notification/add', {
						type: 'error',
						message: 'Only accept JPG, PNG, JPEG, GIF file',
					});
					return;
				}
				// check size file image choose upload
				if (image.size > 5242880) {
					this.$refs.input_image.value = null;
					store.dispatch('notification/add', {
						type: 'error',
						message: 'Image larger than 5MB',
					});
					return;
				}

				// create virtual url to preview image
				this.input.preview_image = URL.createObjectURL(image);
				// assign file image to store to send image file to back end
				this.input.image = image;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.customize-enter-active,
	.customize-leave-active {
		transition: all 0.3s;
	}
	.customize-enter,
	.customize-leave-to {
		transform: translateY(-53px) scaleY(0);
	}

	.card {
		position: relative;
		z-index: 10;

		&-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			background-color: #ffffff;
			gap: 20px;
		}
		&-title {
			font-weight: 500;
			font-size: 1.6rem;
			line-height: 19px;
			color: #003084;
			display: flex;
			gap: 7px;
			align-items: center;
		}

		&-header {
			cursor: pointer;
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
		}
		&-input {
			border: 1px solid $light-1-color;
			height: 40px;
		}
	}
	.more {
		width: 12px;
		height: 16px;
		background-image: url('../../../assets/icons/angle-down.svg');
		background-size: 12px 16px;
		transform: rotate(-90deg);
		transition: all 0.3s ease;
	}
	.bg-gray {
		background: #f2f2f5;
	}

	.preview_img {
		width: 89px;
		height: 60px;
		object-fit: cover;
		object-position: center;
	}

	.select-color {
		width: 18px;
		height: 18px;
		border: 1px solid #ebebf0;
		border-radius: 3px;
	}

	.custom_email {
		position: relative;
		width: 100%;
		background: #ffffff;
		padding: 8px 25px 25px 25px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		transform-origin: top;
		transition: transform 0.5s ease-in-out;
		overflow: hidden;
	}
</style>
