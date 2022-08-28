import api from '@/plugins/api';
import { hexToRgbA } from '@/utils/hexToRGBA';

const state = {
	is_loading: false,
	campaigns: [],
	new_campaign: {
		name: '',
		customers: [],
		subject: '',
		email_content: '',
		email_footer: '',
		email_custom: {
			preview_image: '',
			image: '',
			background: {
				color: {
					color: '#ffffff',
					alpha: 100,
				},
				radius: {
					size: 0,
					unit: 'px',
				},
				text_color: '#000000',
			},
			button: {
				label: '',
				radius: {
					size: 0,
					unit: 'px',
				},
				background_color: {
					color: '#ffffff',
					alpha: 100,
				},
				text_color: {
					color: '#000000',
					alpha: 100,
				},
			},
		},
	},
};
const getters = {
	background_email(state) {
		let background_email = state.new_campaign.email_custom.background;
		return hexToRgbA(
			background_email.color.color,
			background_email.color.alpha / 100
		);
	},
	background_button(state) {
		let background_email =
			state.new_campaign.email_custom.button.background_color;
		return hexToRgbA(background_email.color, background_email.alpha / 100);
	},
	text_color_button(state) {
		let background_email =
			state.new_campaign.email_custom.button.text_color;
		return hexToRgbA(background_email.color, background_email.alpha / 100);
	},
};

const mutations = {
	SET_LOADING(state, payload) {
		state.is_loading = payload;
	},
	SET_CAMPAIGNS(state, payload) {
		state.campaigns = payload;
	},
	SET_STATUS_ALL_COMPAIGN(state) {
		state.campaigns = state.campaigns.map(function (campaign) {
			return {
				...campaign,
				status:
					campaign.sended + campaign.failed === campaign.total
						? 'completed'
						: 'running',
			};
		});
	},
	SET_PROGRESS_COMPAIGN(state, payload) {
		for (let campaign of state.campaigns) {
			if (campaign.id === payload.id) {
				if (campaign.status === 'completed') {
					return;
				}
				campaign.sended = payload.sended;
				campaign.failed = payload.failed;
				if (campaign.sended + campaign.failed === campaign.total) {
					campaign.status = 'completed';
				} else {
					campaign.status = 'running';
				}
			}
		}
	},
	SET_CAMPAIGN_NAME(state, payload) {
		state.new_campaign.name = payload;
	},
	SET_CUSTOMERS(state, payload) {
		state.new_campaign.customers = payload;
	},
	SET_SUBJECT(state, payload) {
		state.new_campaign.subject = payload;
	},
	SET_EMAIL_CONTENT(state, payload) {
		state.new_campaign.email_content = payload;
	},
	SET_EMAIL_FOOTER(state, payload) {
		state.new_campaign.email_footer = payload;
	},
	SET_EMAIL_CUSTOM(state, payload) {
		state.new_campaign.email_custom = payload;
	},
	SET_TEXT_COLOR(state, payload) {
		state.new_campaign.email_custom.background.text_color = payload;
	},
	REMOVE_NEW_CAMPAIGN(state) {
		state.new_campaign = {
			name: '',
			customers: [],
			subject: '',
			email_content: '',
			email_footer: '',
			email_custom: {
				preview_image: '',
				image: '',
				background: {
					color: {
						color: '#ffffff',
						alpha: 100,
					},
					radius: {
						size: 0,
						unit: 'px',
					},
					text_color: '#000000',
				},
				button: {
					label: '',
					radius: {
						size: 0,
						unit: 'px',
					},
					background_color: {
						color: '#ffffff',
						alpha: 100,
					},
					text_color: {
						color: '#000000',
						alpha: 100,
					},
				},
			},
		};
	},
};

const actions = {
	getCampaigns({ commit }, params) {
		return api.CAMPAIGN.getCampaign();
	},
	postNewCampaign({ commit }, payload) {
		return api.CAMPAIGN.createNewCampaign({
			campaign_name: payload.name,
			subject: payload.subject,
			image: payload.image,
			email_body: payload.body,
			list_customers: payload.list,
		});
	},
	SendEmailTest({ commit }, payload) {
		return api.CAMPAIGN.SendTest({
			subject: payload.subject,
			image: payload.image,
			email_body: payload.body,
			list_email: payload.list,
		});
	},
};

export default {
	state,
	mutations,
	getters,
	actions,
	namespaced: true,
};
