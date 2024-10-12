import React, { useEffect, useRef } from 'react';
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

const RichTextEditor = ({ params }) => {
    const { user } = useUser();
    const editorRef = useRef(null);
    const ref = useRef();
    let isFetched = false;
    let skipUpdate = false; 

    useEffect(() => {
        if (user) initializeEditor();
    }, [user]);

    const SaveDocument = debounce(async () => {
        if (ref.current) {
            const outputData = await ref.current.save();
            const docRef = doc(db, 'documentOutput', params?.documentId);
            await updateDoc(docRef, {
                output: outputData,
                editedBy: user?.primaryEmailAddress?.emailAddress
            });
            skipUpdate = true; 
        }
    }, 1000);

    const GetDocumentOutput = () => {
        const unsubscribe = onSnapshot(doc(db, 'documentOutput', params?.documentId), (doc) => {
            const output = doc.data()?.output;
            if (!skipUpdate && output && output.blocks && Array.isArray(output.blocks)) {
                editorRef.current.render(output); 
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
            <div id="editorjs"></div>
        </div>
    );
};

export default RichTextEditor;
