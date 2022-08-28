<template>
	<div
		class="card"
		@click="handleClick">
		<h1 class="card-title">Subject</h1>
		<editor-content
			class="editor"
			:editor="editor" />

		<vue-dropdown ref="dropdownVariant">
			<template slot="dropdown-button">
				<vue-button class="btn-outline card-none-fill">
					<template slot="button-icon">
						<svg
							width="13"
							height="18"
							viewBox="0 0 13 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12.1875 5.75C12.1875 6.24219 11.7773 6.65234 11.3125 6.65234H7.375V10.5898C7.375 11.0547 6.96484 11.4375 6.5 11.4375C6.00781 11.4375 5.625 11.0547 5.625 10.5898V6.65234H1.6875C1.19531 6.65234 0.8125 6.24219 0.8125 5.75C0.8125 5.28516 1.19531 4.90234 1.6875 4.90234H5.625V0.964844C5.625 0.472656 6.00781 0.0625 6.5 0.0625C6.96484 0.0625 7.375 0.472656 7.375 0.964844V4.90234H11.3125C11.7773 4.875 12.1875 5.28516 12.1875 5.75Z"
								fill="#555770" />
						</svg>
					</template>
					Add variant</vue-button
				>
			</template>
			<ul class="list">
				<li
					v-for="(variant, key) in list_variants"
					:key="key"
					@click="handleAddVariant(variant)"
					class="list-item">
					{{ variant }}
				</li>
			</ul>
		</vue-dropdown>
	</div>
</template>

<script>
	import VueInput from '@/components/vue-input.vue';
	import VueButton from '@/components/vue-button.vue';
	import VueDropdown from '@/components/vue-dropdown.vue';
	import { mapMutations, mapState } from 'vuex';
	import { Editor, EditorContent } from '@tiptap/vue-2';
	import StarterKit from '@tiptap/starter-kit';
	import CharacterCount from '@tiptap/extension-character-count';
	import Variant from '@/utils/Variant';
	import store from '@/store';

	export default {
		name: 'campaign-subject',
		components: {
			VueInput,
			VueButton,
			VueDropdown,
			EditorContent,
		},
		data() {
			return {
				editor: null,
				limit_char: 78,
				pivot: false,
				list_variants: [
					'Customer_Last_name',
					'Customer_First_name',
					'Customer_Full_name',
					'Shop_name',
				],
			};
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
			subject: {
				get() {
					if (this.new_campaign.subject == '<p></p>') {
						this.pivot = false;
					}
					return this.new_campaign.subject;
				},
				set(value) {
					this.setSubject(value);
				},
			},
		},
		methods: {
			...mapMutations({
				setSubject: 'campaign/SET_SUBJECT',
			}),
			handleClick() {
				this.editor.commands.focus();
			},
			handleAddVariant(value) {
				// count and block add variants if user added 3 variants
				let str = this.subject;
				let countVariant = str.split('variantvalue').length;
				if (countVariant > 3) {
					store.dispatch('notification/add', {
						type: 'error',
						message: 'You only add 3 variants',
					});
					this.$refs.dropdownVariant.toggleDropdown();
					return;
				}
				// add variant
				this.editor.commands.addVariants({
					variantValue: value,
				});
				this.$refs.dropdownVariant.toggleDropdown();
			},
		},
		created() {
			this.editor = new Editor({
				editorProps: {
					handleDOMEvents: {
						keypress: (view, event) => {
							// block first space in subject
							if (event.code != 'Space') {
								this.pivot = true;
							}
							if (!this.pivot) {
								if (event.code == 'Space') {
									event.preventDefault();
								}
							}
						},
						keydown: (view, event) => {
							//block enter in subject (subject only 1 line)
							if (
								(event.code === 'Enter') &
								(event.key === 'Enter')
							) {
								event.preventDefault();
							}
						},
						paste: (view, event) => {
							//validate when user paste string larger than 78 char
							if (
								event.clipboardData.getData('text').length > 78
							) {
								event.preventDefault();
								this.editor.commands.insertContent(
									event.clipboardData
										.getData('text')
										.slice(0, 78)
								);
							} else {
								event.preventDefault();
								this.editor.commands.insertContent(
									event.clipboardData.getData('text')
								);
							}
						},
					},
				},
				content: this.subject,
				extensions: [
					StarterKit,
					CharacterCount.configure({
						limit: this.limit_char,
					}),
					Variant,
				],
				onUpdate: () => {
					this.subject = this.editor.getHTML();
				},
			});
		},
		beforeDestroy() {
			this.editor.destroy();
		},
	};
</script>

<style lang="scss" scoped>
	.card {
		cursor: text;
	}
	.editor {
		font-weight: 400;
		color: #1c1c28;
		padding: 12px 13px 11px 13px;
		// max-width: 490px;
		width: 100%;
		outline: none;
		overflow: hidden;
		font-size: 14px;
		line-height: 15px;
		border: 1px solid $light-1-color;
		border-radius: 4px;
	}
	.input {
		justify-content: space-between;
	}
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
