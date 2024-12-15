import React, { useState } from 'react';
import {
    EditorState,
    Editor,
    RichUtils,
    Modifier,
    convertToRaw,
    convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Button from '../Button/Button';
import style from './CustomEditor.module.scss';

const CustomEditor = () => {
    const [editorState, setEditorState] = useState(getEditorState());
    const styleMap = {
        'RED-TEXT': {
            color: 'red',
        },
    };
    function getEditorState() {
        const savedContent = localStorage.getItem('editorContent');
        if (savedContent) {
            return EditorState.createWithContent(
                convertFromRaw(JSON.parse(savedContent))
            );
        }
        return EditorState.createEmpty();
    }

    const handleChange = (newEditorState) => {
        const currentContent = newEditorState.getCurrentContent();
        const selection = newEditorState.getSelection();
        const block = currentContent.getBlockForKey(selection.getStartKey());
        const text = block.getText();

        if (text.startsWith('# ')) {
            const newContent = Modifier.removeRange(
                currentContent,
                selection.merge({
                    anchorOffset: 0,
                    focusOffset: 2,
                }),
                'backward'
            );
            const updatedEditorState = EditorState.push(
                newEditorState,
                newContent,
                'remove-range'
            );
            setEditorState(
                RichUtils.toggleBlockType(updatedEditorState, 'header-one')
            );
        } else if (text.startsWith('* ')) {
            const newContent = Modifier.removeRange(
                currentContent,
                selection.merge({
                    anchorOffset: 0,
                    focusOffset: 2,
                }),
                'backward'
            );
            const updatedEditorState = EditorState.push(
                newEditorState,
                newContent,
                'remove-range'
            );
            setEditorState(
                RichUtils.toggleInlineStyle(updatedEditorState, 'BOLD')
            );
        } else if (text.startsWith('** ')) {
            const newContent = Modifier.removeRange(
                currentContent,
                selection.merge({
                    anchorOffset: 0,
                    focusOffset: 3,
                }),
                'backward'
            );
            const updatedEditorState = EditorState.push(
                newEditorState,
                newContent,
                'remove-range'
            );
            setEditorState(
                RichUtils.toggleInlineStyle(updatedEditorState, 'RED-TEXT')
            );
        } else if (text.startsWith('*** ')) {
            const newContent = Modifier.removeRange(
                currentContent,
                selection.merge({
                    anchorOffset: 0,
                    focusOffset: 4,
                }),
                'backward'
            );
            const updatedEditorState = EditorState.push(
                newEditorState,
                newContent,
                'remove-range'
            );
            setEditorState(
                RichUtils.toggleInlineStyle(updatedEditorState, 'UNDERLINE')
            );
        } else {
            setEditorState(newEditorState);
        }
    };

    const saveContent = () => {
        const contentState = editorState.getCurrentContent();
        localStorage.setItem(
            'editorContent',
            JSON.stringify(convertToRaw(contentState))
        );
        alert('Content saved to localStorage!');
    };

    return (
        <div className={style.main_wrap}>
            <div className={style.header_wrap}>
                <div></div>
                <div className={style.title}>Demo editor by Sagar Mehta</div>
                <Button onClick={saveContent}>Save</Button>
            </div>
            <div className={style.editor_wrap}>
                <Editor
                    editorState={editorState}
                    onChange={handleChange}
                    customStyleMap={styleMap}
                    placeholder="Start typing..."
                />
            </div>
        </div>
    );
};

export default CustomEditor;
