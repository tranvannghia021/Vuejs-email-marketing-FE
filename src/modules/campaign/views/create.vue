<template>
	<div
		class="campaign"
		ref="campaign">
		<campaign-nav @eventSaveCampaignOnNav="handleSave"></campaign-nav>
		<div class="column">
			<div class="content">
				<campaign-name></campaign-name>
				<campaign-customer></campaign-customer>
				<campaign-subject></campaign-subject>
				<campaign-email-content></campaign-email-content>
				<campaign-email-footer></campaign-email-footer>
				<campaign-custom-email></campaign-custom-email>
			</div>
			<campaign-preview-email></campaign-preview-email>
		</div>
		<div class="campaign-footer">
			<vue-button
				@clicked="backHomeCampagin"
				class="btn-outline btn-cancel"
				>Cancel</vue-button
			>
			<vue-button
				:is_loading="is_loading"
				@clicked="handleSave"
				class="btn-primary btn-save"
				>Save</vue-button
			>
		</div>
	</div>
</template>

<script>
	import CampaignNav from '../components/campaign-nav.vue';
	import CampaignName from '../components/campaign-name.vue';
	import CampaignCustomer from '../components/campaign-customer.vue';
	import CampaignSubject from '../components/campaign-subject.vue';
	import CampaignEmailContent from '../components/campaign-email-content.vue';
	import CampaignEmailFooter from '../components/campaign-email-footer.vue';
	import CampaignCustomEmail from '../components/campaign-custom-email.vue';
	import CampaignPreviewEmail from '../components/campaign-preview-email.vue';
	import VueButton from '@/components/vue-button.vue';
	import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
	import store from '@/store';
	import router from '@/router';
	import mixins from '@/plugins/mixins';

	export default {
		name: 'create-campaign',
		components: {
			'campaign-nav': CampaignNav,
			CampaignName,
			CampaignCustomer,
			'campaign-subject': CampaignSubject,
			'campaign-email-content': CampaignEmailContent,
			'campaign-email-footer': CampaignEmailFooter,
			'campaign-custom-email': CampaignCustomEmail,
			'campaign-preview-email': CampaignPreviewEmail,
			VueButton,
		},
		mixins: [mixins],
		computed: {
			...mapState('campaign', ['is_loading', 'new_campaign']),
			...mapGetters('campaign', [
				'background_email',
				'background_button',
				'text_color_button',
			]),
		},
		methods: {
			...mapActions({
				postNewCampaign: 'campaign/postNewCampaign',
			}),
			...mapMutations({
				set_loading: 'campaign/SET_LOADING',
				reset_new_campaign: 'campaign/REMOVE_NEW_CAMPAIGN',
			}),
			async handleSave() {
				if (!this.new_campaign.name) {
					store.dispatch('notification/add', {
						type: 'error',
						message: 'Campaign name is empty',
					});
					return;
				}
				if (this.new_campaign.customers.length <= 0) {
					store.dispatch('notification/add', {
						type: 'error',
						message: 'List customer is empty',
					});
					return;
				}
				if (!this.new_campaign.subject) {
					store.dispatch('notification/add', {
						type: 'error',
						message: 'Subject is empty',
					});
					return;
				}
				if (!this.new_campaign.email_content) {
					store.dispatch('notification/add', {
						type: 'error',
						message: 'Email content is empty',
					});
					return;
				}
				if (!this.new_campaign.email_custom.image) {
					store.dispatch('notification/add', {
						type: 'error',
						message: 'Image is empty',
					});
					return;
				}
				this.set_loading(true);

				let subject = this.handleSubject(this.new_campaign.subject);
				let body = this.handleBodyEmail(
					{
						background_email_color: this.background_email,
						background_email_radius:
							this.new_campaign.email_custom.background.radius
								.size +
							this.new_campaign.email_custom.background.radius
								.unit,
						email_content: this.new_campaign.email_content,
						button_label:
							this.new_campaign.email_custom.button.label,
						text_color:
							this.new_campaign.email_custom.background
								.text_color,
						background_button: this.background_button,
						background_button_radius:
							this.new_campaign.email_custom.button.radius.size +
							this.new_campaign.email_custom.button.radius.unit,
						text_color_button: this.text_color_button,
						email_footer: this.new_campaign.email_footer,
					},
					true
				);
				let list_id = this.createListId(this.new_campaign.customers);
				try {
					const res = await this.postNewCampaign({
						name: this.new_campaign.name,
						subject,
						image: this.new_campaign.email_custom.image,
						body,
						list: JSON.stringify(list_id),
					});
					if (res.success) {
						store.dispatch('notification/add', {
							type: 'success',
							message: res.message,
						});
						this.reset_new_campaign();
						this.set_loading(false);

						router.push({ name: 'Campaign' });
					}
				} catch (error) {
					let errors = error.data.message;
					store.dispatch('notification/add', {
						type: 'error',
						message: errors.campaign_name
							? errors.campaign_name[0]
							: errors.image
							? errors.image[0]
							: errors.subject
							? errors.subject[0]
							: errors.email_body
							? errors.email_body[0]
							: errors.list_customers
							? errors.list_customers[0]
							: errors
							? errors
							: 'Server Error',
					});
					this.set_loading(false);

					return;
				}
			},
			beforeUnloadListener(event) {
				event.preventDefault();
				return (event.returnValue =
					'Changes you made may not be saved.');
			},
		},
		beforeRouteLeave(to, from, next) {
			if (
				this.new_campaign.name ||
				this.new_campaign.customers != 0 ||
				this.new_campaign.subject ||
				this.new_campaign.email_content ||
				this.new_campaign.email_custom.button.label ||
				this.new_campaign.email_custom.img
			) {
				if (from.name === 'CreateCampaign') {
					const answer = window.confirm(
						'Changes you made may not be saved.'
					);
					if (!answer) return false;
					this.reset_new_campaign();
					next();
				} else {
					next();
				}
			} else {
				next();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.campaign {
		overflow-y: scroll;
		max-height: calc(100vh - 65px);
		position: relative;

		&::-webkit-scrollbar {
			display: none;
		}

		&-footer {
			display: flex;
			gap: 16px;
			justify-content: flex-end;
			padding-top: 20px;
			margin-right: 20px;
			margin-left: 25px;
			padding-bottom: 58px;
			border-top: 1px solid #e4e4eb;
		}
	}

	.column {
		padding: 30px 20px 30px 25px;

		display: flex;
		gap: 25px;

		&::-webkit-scrollbar {
			display: none;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 25px;
		width: 47%;
		position: relative;
		overflow: hidden;
	}

	.btn {
		&-save {
			padding: 4px 28px;
			line-height: 24px;
			border: none;
		}
		&-cancel {
			padding: 4px 19px 6px 20px;
			line-height: 24px;
		}
	}
	.loading {
		position: absolute;
	}
</style>
