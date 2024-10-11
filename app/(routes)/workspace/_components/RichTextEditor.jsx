import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from "editorjs-alert"
import List from '@editorjs/list';
import CheckList from "@editorjs/checklist";
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code';
import AIText from '@alkhipce/editorjs-aitext'

const RichTextEditor = () => {
    const ref = useRef();
    let editor;

    useEffect(() => {
        initializeEditor();
    }, [])

    const SaveDocument = () => {
        ref.current.save().then((output)=>{
            
        })
    }

    const initializeEditor = () => {
        if (!editor?.current) {
            editor = new EditorJS({
                onChange: (ap, event) => {
                    SaveDocument();
                },
                /**
                 * Id of Element that should contain Editor instance
                 */
                holder: 'editorjs',
                tools: {
                    aiText: {
                        // if you do not use TypeScript you need to remove "as unknown as ToolConstructable" construction
                        // type ToolConstructable imported from @editorjs/editorjs package
                        class: AIText,
                        config: {
                            // here you need to provide your own suggestion provider (e.g., request to your backend)
                            // this callback function must accept a string and return a Promise<string>
                            callback: (text) => {
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve('AI: ' + text)
                                    }, 1000)
                                })
                            },
                        }
                    },
                    header: Header,
                    delimiter: Delimiter,
                    alert: {
                        class: Alert,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+A',
                        config: {
                            alertTypes: ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'],
                            defaultType: 'primary',
                            messagePlaceholder: 'Enter something...',
                        },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+L',
                        config: {
                            defaultStyle: 'unordered'
                        },
                    },
                    checklist: {
                        class: CheckList,
                        shortcut: 'CMD+SHIFT+C',
                        inlineToolbar: true,
                    },
                    image: SimpleImage,
                    table: Table,
                    code: {
                        class: CodeTool,
                        shortcut: 'CMD+SHIFT+P'
                    },
                },
                placeholder: "Write anything..."
            });
            ref.current = editor
        }
    }

    return (
        <div className='px-5 ml-5'>
            <div id="editorjs"></div>
        </div>
    )
}

export default RichTextEditor