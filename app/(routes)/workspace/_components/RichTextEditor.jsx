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

const RichTextEditor = ({ params }) => {
    const { user } = useUser();
    const editorRef = useRef(null);
    const ref = useRef();
    const [isMounted, setIsMounted] = useState(false);
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

    const SaveDocument = debounce(async () => {
        if (ref.current) {
            const outputData = await ref.current.save();
    
            // Ensure blocks exist and is an array
            const sanitizedOutputData = {
                ...outputData,
                blocks: outputData.blocks && Array.isArray(outputData.blocks)
                    ? outputData.blocks.map(block => {
                        if (block.type === 'table' && Array.isArray(block.data.content)) {
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    content: JSON.stringify(block.data.content) // Stringify only the table content
                                }
                            };
                        }
                        return block; // Keep other blocks as they are
                    })
                    : [] // Provide a fallback if blocks are undefined
            };
    
            const docRef = doc(db, 'documentOutput', params?.documentId);
            await updateDoc(docRef, {
                output: sanitizedOutputData, // Store sanitized output
                editedBy: user?.primaryEmailAddress?.emailAddress
            });
            skipUpdate = true;
        }
    }, 1000);
    
    const GetDocumentOutput = () => {
        const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentId), (doc) => {
            const output = doc.data()?.output;
    
            // Check if output and output.blocks are valid before mapping
            if (!skipUpdate && output && output.blocks && Array.isArray(output.blocks)) {
                const parsedOutput = {
                    ...output,
                    blocks: output.blocks.map(block => {
                        if (block.type === 'table' && typeof block.data.content === 'string') {
                            return {
                                ...block,
                                data: {
                                    ...block.data,
                                    content: JSON.parse(block.data.content) // Parse the stringified table content
                                }
                            };
                        }
                        return block; // Keep other blocks as they are
                    })
                };
    
                if (parsedOutput.blocks && Array.isArray(parsedOutput.blocks)) {
                    editorRef.current.render(parsedOutput);
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
            <div className='fixed bottom-5 md:ml-80 left-0 z-10'>
                <GenerateContent setGenerateContent={(output)=>editorRef.current.render(output)}/>
            </div>
        </div>
    );
};

export default RichTextEditor;

