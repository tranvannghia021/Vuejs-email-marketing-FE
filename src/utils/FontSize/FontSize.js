import { Mark, markInputRule, markPasteRule, mergeAttributes, } from '@tiptap/core';
export const inputRegex = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))$/;
export const pasteRegex = /(?:^|\s)((?:==)((?:[^~=]+))(?:==))/g;
export const FontSize = Mark.create({
    name: 'fontsize',
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    addAttributes() {
        return {
            fontSize: {
                default: 14,
                parseHTML: element => element.style.fontSize,
                renderHTML: attributes => {
                    if (!attributes.fontSize) {
                        return {};
                    }
                    return {
                        style: `font-size: ${attributes.fontSize}; line-height: calc(${attributes.fontSize} + 5px)`,
                    };
                },
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'span',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setFontSize: attributes => ({ commands }) => {
                return commands.setMark(this.name, attributes);
            },
            toggleFontSize: attributes => ({ commands }) => {
                return commands.toggleMark(this.name, attributes);
            },
            unsetFontSize: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
        };
    },
    addInputRules() {
        return [
            markInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ];
    }, 
    addPasteRules() {
        return [
            markPasteRule({
                find: pasteRegex,
                type: this.type,
            }),
        ];
    },
});