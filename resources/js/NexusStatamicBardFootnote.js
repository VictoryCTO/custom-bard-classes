import { Mark, Plugin } from 'tiptap'
import { updateMark, removeMark } from 'tiptap-commands'

export default class NexusStatamicBardFootnote extends Mark {
    name() {
        return "nexusStatamicBardFootnote";
    }

    schema() {
        return {
            attrs: {
                url: {
                    default: '',
                },
                text: {
                    default: '',
                },
            },
            parseDOM: [
                {
                    tag: "sup",
                    getAttrs: (dom) => ({
                        url: dom.getAttribute('data-url'),
                        text: dom.getAttribute('data-text'),
                    })
                }
            ],
            toDOM: (mark) => [
                "sup",
                {
                    'data-url': mark.attrs.url,
                    'data-text': mark.attrs.text
                },
                0,
            ],
        };
    }

    commands({type}) {
        return attrs => {
            if (attrs.url) {
                return updateMark(type, attrs)
            }

            return removeMark(type)
        }
    }

    inputRules({type}) {
        return [] // Input rules if you want
    }

    plugins() {
        return [
            /*new Plugin({
                props: {
                    handleClickOn(view, pos, node) {
                        if(mark())
                        console.log('handleClickOn', node.attrs);
                        view.updateShowOptions();
                    },
                },
            }),*/
        ]
    }

    pasteRules({ type }) {
        return []
        /*return [
            pasteRule(
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=,()!]*)/gi,
                type,
                url => ({ url: url }),
            ),
        ]*/
    }
}
