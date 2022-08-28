import router from '@/router';

export default {
	methods: {
		handleSubject(value) {
			//format variant
			value = value.replaceAll(
				' style="background: #003084;color: #FFFFFF;font-weight: 400;font-size: 10px;line-height: 25px;padding: 4px;border-radius: 3px; margin-top: 2px;">',
				'>$'
			);
			//delete html tags
			value = value.replaceAll(/<(?:.|\n)*?>/gm, '');
			return value;
		},
		handleBodyEmail(value, format_variants = false) {
			//create body
			let body = `
                <div style="background-color: #f6f6f6; padding: 30px 0"><div style="width: 600px; margin: 0 auto;">
                    <div style="background: ${value.background_email_color};
                                border-radius: ${value.background_email_radius};
                                overflow: hidden;">
                        <img style="overflow: hidden;
                                    width: 100%; 
                                    object-fit: cover; 
                                    object-position: center;" 
                                    src="$href_image" />
                        <div style="word-wrap: break-word; 
                                    padding: 30px 30px 36px 30px;
                                    color: ${value.text_color}">
                            ${
								'<div style="white-space:pre-wrap;">' +
								value.email_content +
								'</div>'
							}
                            ${
								value.button_label
									? `<a style="line-height: 18px;
                                        border: none;
                                        background: ${value.background_button};
                                        border-radius: ${value.background_button_radius};
                                        color: ${value.text_color_button};
                                        padding: 9px;
                                        margin-top: 25px;
                                        display: block;
                                        text-align: center;
                                        font-weight: 700;
                                        font-size: 14px;
                                        text-decoration: none;"
                                        href="#">${value.button_label}</a>`
									: ''
							}
                        </div>
                    </div>
                    ${
						value.email_footer
							? `<div style="padding: 20px; word-wrap: break-word;white-space:pre-wrap;">${value.email_footer}</div>`
							: ''
					}
                </div></div>
                `;
			//format variant
			if (format_variants) {
				body = body.replaceAll(
					' style="background: #003084;color: #FFFFFF;font-weight: 400;font-size: 10px;line-height: 25px;padding: 4px;border-radius: 3px; margin-top: 2px;">',
					'>$'
				);
			}

			return body;
		},
		createListId(arr) {
			return arr.map(function (value) {
				return value.id;
			});
		},
		backHomeCampagin() {
			router.push({ name: 'Campaign' });
		},
		ValidateEmail(mail) {
			return mail.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		},
	},
};
