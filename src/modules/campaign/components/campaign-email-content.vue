<template>
	<div class="card">
		<h1 class="card-title">Email Content</h1>
		<div>
			<vue-toolbar-editor :editor="editor"></vue-toolbar-editor>
			<div class="editor">
				<editor-content
					class="editor-content"
					:editor="editor" />
			</div>
		</div>
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
	import Underline from '@tiptap/extension-underline';
	import TextAlign from '@tiptap/extension-text-align';
	import TaskItem from '@tiptap/extension-task-item';
	import TaskList from '@tiptap/extension-task-list';
	import FontSize from '@/utils/FontSize';
	import VueToolbarEditor from '@/components/vue-toolbar-editor.vue';
	import Variant from '@/utils/Variant';
	import CustomHeading from '@/utils/Heading';

	export default {
		name: 'create-campaign-name',
		components: {
			VueInput,
			VueButton,
			VueDropdown,
			EditorContent,
			VueToolbarEditor,
		},
		data() {
			return {
				editor: null,
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
			input: {
				get() {
					return this.new_campaign.email_content;
				},
				set(value) {
					value = value.replaceAll(
						'<p style="text-align: right"></p>',
						'<p><br/></p>'
					);
					value = value.replaceAll(
						'<p style="text-align: center"></p>',
						'<p><br/></p>'
					);
					value = value.replaceAll('<p></p>', '<p><br/></p>');
					this.setEmailContent(value);
				},
			},
		},
		methods: {
			...mapMutations({
				setEmailContent: 'campaign/SET_EMAIL_CONTENT',
			}),
			handleAddVariant(value) {
				// handle add variant
				this.editor.commands.addVariants({
					variantValue: value,
				});

				//disable menu dropdown add variants
				this.$refs.dropdownVariant.toggleDropdown();
			},
		},
		created() {
			this.editor = new Editor({
				editorProps: {
					attributes: {
						style: 'min-height: 160px;',
					},
				},
				content: this.input,
				extensions: [
					StarterKit.configure({
						listItem: {
							HTMLAttributes: {
								class: 'list-item-editor',
							},
						},
					}),
					Variant,
					Underline,
					TextAlign.configure({
						types: ['customheading', 'paragraph'],
					}),
					TaskList.configure({
						HTMLAttributes: {
							class: 'list-editor',
						},
					}),
					TaskItem.configure({
						nested: true,
						HTMLAttributes: {
							class: 'list-item-editor2',
						},
					}),
					FontSize,
					CustomHeading,
				],
				onUpdate: () => {
					this.input = this.editor.getHTML();
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
		resize: both;

		min-height: 209px;
		min-width: 100%;
		&-email-content {
			min-height: 209px;
		}
	}
</style>
