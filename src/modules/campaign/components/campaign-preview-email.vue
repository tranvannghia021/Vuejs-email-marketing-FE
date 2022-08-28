<template>
	<div class="preview">
		<campaign-send-test-email
			v-model="send_test_email"></campaign-send-test-email>
		<div class="row">
			<h1 class="card-title">Preview</h1>
			<vue-button
				class="btn-primary btn-send-test"
				@clicked="toggleModalSendTest">
				<template slot="button-icon">
					<svg
						width="14"
						height="18"
						viewBox="0 0 15 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.4531 5.95703L2.20312 0.707031C2.09375 0.652344 1.98438 0.625 1.875 0.625C1.62891 0.625 1.38281 0.707031 1.21875 0.898438C0.972656 1.17188 0.917969 1.58203 1.08203 1.91016L3.625 6.75L1.08203 11.6172C0.917969 11.9453 0.972656 12.3555 1.21875 12.6016C1.38281 12.793 1.62891 12.9023 1.875 12.9023C1.98438 12.9023 2.09375 12.875 2.20312 12.8203L14.4531 7.57031C14.7812 7.43359 15 7.10547 15 6.75C14.9727 6.42188 14.7812 6.09375 14.4531 5.95703ZM2.80469 2.40234L11.4727 6.09375H4.74609L2.80469 2.40234ZM4.74609 7.40625H11.4727L2.80469 11.125L4.74609 7.40625Z"
							fill="white" />
					</svg>
				</template>
				Send test
			</vue-button>
		</div>
		<div
			class="card pd-20"
			id="subject">
			<div class="subject">
				<span class="text-dark-2"> Subject: </span>
				<strong v-html="showSubject"></strong>
			</div>
			<div class="flex flex-gap-20">
				<img
					src="../../../assets/images/avatar.png"
					alt="" />
				<div class="flex flex-column flex-gap-4">
					<div class="flex flex-gap-7">
						<b>{{ user.name }}</b>
						<span>{{ user.email }} </span>
					</div>
					<span>to Customer email</span>
				</div>
			</div>
		</div>
		<div
			class="preview-email"
			id="preview_email">
			<div
				:style="{
					'background-color':
						new_campaign.email_content ||
						new_campaign.email_custom.button.label
							? background_email
							: 'none',
					'border-radius':
						new_campaign.email_custom.background.radius.size +
						new_campaign.email_custom.background.radius.unit,
					overflow: 'hidden',
				}">
				<img
					v-show="new_campaign.email_custom.preview_image"
					class="preview-image"
					:src="new_campaign.email_custom.preview_image" />
				<div
					v-show="
						new_campaign.email_content ||
						new_campaign.email_custom.button.label
					"
					class="preview-content">
					<div
						v-show="new_campaign.email_content"
						v-html="new_campaign.email_content"
						:style="{
							color: new_campaign.email_custom.background
								.text_color,
						}"></div>
					<a
						v-show="new_campaign.email_custom.button.label"
						class="preview-button"
						:style="{
							'border-radius':
								new_campaign.email_custom.button.radius.size +
								new_campaign.email_custom.button.radius.unit,
							'background-color': background_button,
							color: text_color_button,
						}"
						>{{ new_campaign.email_custom.button.label }}</a
					>
				</div>
			</div>
			<div
				v-show="new_campaign.email_footer"
				class="preview-footer"
				v-html="new_campaign.email_footer"></div>
		</div>
	</div>
</template>

<script>
	import VueButton from '@/components/vue-button.vue';
	import CampaignSendTestEmail from './campaign-send-test-email.vue';
	import VueInput from '@/components/vue-input.vue';
	import { mapGetters, mapState } from 'vuex';

	export default {
		name: 'campaign-preview-email',
		components: {
			VueButton,
			VueInput,
			CampaignSendTestEmail,
		},
		data() {
			return {
				send_test_email: false,
			};
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
			...mapState('auth', ['user']),
			...mapGetters({
				background_email: 'campaign/background_email',
				text_color_button: 'campaign/text_color_button',
				background_button: 'campaign/background_button',
			}),
			showSubject() {
				let result = this.new_campaign.subject
					.replace('<p>', '')
					.replace('</p>', '');
				return result;
			},
		},
		methods: {
			toggleModalSendTest() {
				this.send_test_email = !this.send_test_email;
			},
		},
	};
</script>

<style lang="scss" scoped>
	.btn-send-test {
		font-weight: 500;
		padding-top: 9px;
		padding-bottom: 9px;
	}
	.preview {
		flex: 53%;
		display: flex;
		flex-direction: column;
		gap: 25px;
		overflow: clip;

		&-main {
			top: 10px;
			word-wrap: break-word;
		}

		&-footer {
			padding: 20px;
			word-wrap: break-word;
			white-space: pre-wrap;
		}

		&-email {
			position: -webkit-sticky;
			position: sticky;
			top: 8px;
		}

		&-content {
			padding: 30px;
			display: flex;
			flex-direction: column;
			gap: 25px;
			word-wrap: break-word;
			white-space: pre-wrap;
			white-space: break-spaces;
		}

		&-image {
			width: 100%;
			object-fit: cover;
			object-position: center;
		}

		&-button {
			line-height: 18px;
			border: none;
			padding: 9px;
			margin-top: 25px;
			display: block;
			font-weight: 700;
			font-size: 14px;
			text-align: center;
		}
	}

	.footer-email {
		color: $dark-2-color;
		padding-top: 20px;
	}

	.subject {
		white-space: pre-wrap;
		overflow: hidden;
		text-overflow: ellipsis;
		box-decoration-break: clone;
	}
</style>
