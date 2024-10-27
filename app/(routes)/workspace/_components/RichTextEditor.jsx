import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Alert from "editorjs-alert";
import List from '@editorjs/list';
import CheckList from "@editorjs/checklist";
import SimpleImage from 'simple-image-editorjs';
import Table from '@editorjs/table';
import CodeTool from '@editorjs/code';
import AIText from '@alkhipce/editorjs-aitext';
import { db } from '@/config/FirebaseConfig';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { debounce } from 'lodash';
import GenerateContent from './GenerateContent';
import ChatWithDocument from './ChatWithDocument';
import TranslateDocument from './TranslateDocument';

const RichTextEditor = ({ params }) => {
    const { user } = useUser();
    const editorRef = useRef(null);
    const ref = useRef();
    const [isMounted, setIsMounted] = useState(false);
    const [currentDocumentContent, setCurrentDocumentContent] = useState(null);
    const [plainTextContent, setPlainTextContent] = useState('');

    let isFetched = false;
    let skipUpdate = false;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && user) {
            initializeEditor();
        }
    }, [isMounted, user]);

    const getPlainText = (blocks) => {
        if (!blocks) return '';

        return blocks.map(block => {
            switch (block.type) {
                case 'paragraph':
                    return block.data.text;
                case 'header':
                    return block.data.text;
                case 'list':
                    return block.data.items.join('\n');
                case 'checklist':
                    return block.data.items.map(item => item.text).join('\n');
                case 'table':
                    const content = Array.isArray(block.data.content)
                        ? block.data.content
                        : JSON.parse(block.data.content);
                    return content.map(row => row.join('\t')).join('\n');
                case 'code':
                    return block.data.code;
                case 'alert':
                    return block.data.message;
                default:
                    return '';
            }
        }).filter(text => text).join('\n\n');
    };

    const SaveDocument = debounce(async () => {
        if (ref.current) {
            const outputData = await ref.current.save();
            setCurrentDocumentContent(outputData);
            setPlainTextContent(getPlainText(outputData.blocks));

            const sanitizedOutputData = {
                ...outputData,
                blocks: outputData.blocks && Array.isArray(outputData.blocks)
                    ? outputData.blocks.map(block => {
                        if (block.type === 'table' && Array.isArray(block.data.content)) {
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    content: JSON.stringify(block.data.content)
                                }
                            };
                        }
                        return block;
                    })
                    : []
            };

            const docRef = doc(db, 'documentOutput', params?.documentId);
            await updateDoc(docRef, {
                output: sanitizedOutputData,
                editedBy: user?.primaryEmailAddress?.emailAddress
            });
            skipUpdate = true;
        }
    }, 1000);

    const GetDocumentOutput = () => {
        const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentId), (doc) => {
            const output = doc.data()?.output;

            if (!skipUpdate && output && output.blocks && Array.isArray(output.blocks)) {
                const parsedOutput = {
                    ...output,
                    blocks: output.blocks.map(block => {
                        if (block.type === 'table' && typeof block.data.content === 'string') {
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    content: JSON.parse(block.data.content)
                                }
                            };
                        }
                        return block;
                    })
                };

                if (parsedOutput.blocks && Array.isArray(parsedOutput.blocks)) {
                    editorRef.current.render(parsedOutput);
                    setCurrentDocumentContent(parsedOutput);
                    setPlainTextContent(getPlainText(parsedOutput.blocks));
                }
            }

            isFetched = true;
            skipUpdate = false;
        });
        return () => unsubscribe();
    };

    const initializeEditor = () => {
        if (!editorRef.current) {
            const editor = new EditorJS({
                onChange: () => {
                    SaveDocument();
                },
                onReady: () => {
                    GetDocumentOutput();
                },
                holder: 'editorjs',
                tools: {
                    aiText: {
                        class: AIText,
                        config: {
                            callback: (text) => {
                                return new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve('AI: ' + text);
                                    }, 1000);
                                });
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
            editorRef.current = editor;
            ref.current = editor;
        }
    };

    return (
        <div className='px-5 ml-5'>
            <div id="editorjs" className='w-[70%]'></div>
            <div className='fixed flex flex-col right-5 bottom-[70px] gap-2 z-50'>
                <GenerateContent setGenerateContent={(output) => editorRef.current.render(output)} />
                <ChatWithDocument documentContent={currentDocumentContent} />
                <TranslateDocument documentContent={plainTextContent} />
            </div>
        </div>
    );
};

export default RichTextEditor;