import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/core';
export const CustomHeading = Node.create({
    name: 'customheading',
    addOptions() {
        return {
            levels: [1, 2, 3, 4, 5, 6],
            HTMLAttributes: {},
        };
    },
    content: 'inline*',
    group: 'block',
    defining: true,
    addAttributes() {
        return {
            level: {
                default: 1,
                rendered: false,
            },
        };
    },
    parseHTML() {
        return this.options.levels
            .map((level) => ({
            tag: `h${level}`,
            attrs: { level },
        }));
    },
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel
            ? node.attrs.level
            : this.options.levels[0];
        if (HTMLAttributes.style) {
            HTMLAttributes.style = `${HTMLAttributes.style}; ${(level === 1 ? 'line-height: 30px;' : (level === 2 ? 'line-height: 23px' : (level === 3 ? 'line-height: 18px' : (level === 4 ? 'line-height: 16px;' : (level === 5 ? 'line-height: 13px;' : (level === 6 ? 'line-height: 12px' : ''))))))}`;
        } else {
            HTMLAttributes.style = (level === 1 ? 'line-height: 30px;' : (level === 2 ? 'line-height: 23px' : (level === 3 ? 'line-height: 18px' : (level === 4 ? 'line-height: 16px;' : (level === 5 ? 'line-height: 13px;' : (level === 6 ? 'line-height: 12px' : ''))))));
        }
        return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setCustomHeading: attributes => ({ commands }) => {
                if (!this.options.levels.includes(attributes.level)) {
                    return false;
                }
                return commands.setNode(this.name, attributes);
            },
            toggleCustomHeading: attributes => ({ commands }) => {
                if (!this.options.levels.includes(attributes.level)) {
                    return false;
                }
                return commands.toggleNode(this.name, 'paragraph', attributes);
            },
        };
    },
    addKeyboardShortcuts() {
        return this.options.levels.reduce((items, level) => (Object.assign(Object.assign({}, items), {
            [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
        })), {});
    },
    addInputRules() {
        return this.options.levels.map(level => {
            return textblockTypeInputRule({
                find: new RegExp(`^(#{1,${level}})\\s$`),
                type: this.type,
                getAttributes: {
                    level,
                },
            });
        });
    },
});