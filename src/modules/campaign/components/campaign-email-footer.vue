<template>
	<div class="card">
		<h1 class="card-title">Email footer</h1>
		<div>
			<vue-toolbar-editor :editor="editor"></vue-toolbar-editor>
			<div class="editor">
				<editor-content
					class="editor-content"
					:editor="editor" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapState } from 'vuex';
	import { Editor, EditorContent } from '@tiptap/vue-2';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import TextAlign from '@tiptap/extension-text-align';
	import VueDropdown from '@/components/vue-dropdown.vue';
	import TaskItem from '@tiptap/extension-task-item';
	import TaskList from '@tiptap/extension-task-list';
	import FontSize from '@/utils/FontSize';
	import CustomHeading from '@/utils/Heading';

	import VueToolbarEditor from '@/components/vue-toolbar-editor.vue';

	export default {
		name: 'campaign-email-footer',
		components: { EditorContent, VueDropdown, VueToolbarEditor },
		data() {
			return {
				editor: null,
			};
		},
		computed: {
			...mapState('campaign', ['new_campaign']),
			input: {
				get() {
					return this.new_campaign.email_footer;
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
					this.setEmailFooter(value);
				},
			},
		},
		methods: {
			...mapMutations({
				setEmailFooter: 'campaign/SET_EMAIL_FOOTER',
			}),
		},
		created() {
			this.editor = new Editor({
				editorProps: {
					attributes: {
						style: 'min-height: 18px;',
					},
				},
				content: this.input,
				extensions: [
					StarterKit,
					Underline,
					TextAlign.configure({
						types: ['customheading', 'paragraph'],
					}),
					TaskList,
					TaskItem.configure({
						nested: true,
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
		min-height: 67px;
		min-width: 100%;
	}
</style>
