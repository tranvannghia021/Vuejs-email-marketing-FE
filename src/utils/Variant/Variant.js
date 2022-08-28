import { mergeAttributes, Node, nodeInputRule, } from '@tiptap/core';
export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
export const Variant = Node.create({
    name: 'variant',
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    group: 'inline',
    inline: true,
    atom: true,
    draggable: true,
    addAttributes() {
        return {
            variantValue: {
                default: null,
            }, 
            style: {
                default: `background: #003084;color: #FFFFFF;font-weight: 400;font-size: 10px;line-height: 25px;padding: 4px;border-radius: 3px; margin-top: 2px;`,
              },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'span'
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        let variant = HTMLAttributes.variantValue;
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), variant];
    },
    addCommands() {
        return {
            addVariants: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ];
    },
});