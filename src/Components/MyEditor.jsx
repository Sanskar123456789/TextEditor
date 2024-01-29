import React, { useState } from 'react';
import { Editor, EditorState, ContentBlock, RichUtils } from 'draft-js';
import { ContentState } from 'react-draft-wysiwyg';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleContentChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();

    // Process each block to handle special characters at the beginning of a line
    const newContentState = ContentState.createFromBlockArray(
      blocks.map((block) => {
        const text = block.getText();

        if (text.startsWith('# ')) {
          // Convert line to heading and remove '# ' prefix
          const updatedText = text.slice(2);
          return new ContentBlock({
            key: block.getKey(),
            type: 'header-one',
            text: updatedText,
            characterList: block.getCharacterList(),
          });
        } else if (text.startsWith('* ')) {
          // Convert line to bold and remove '* ' prefix
          const updatedText = text.slice(2);
          return new ContentBlock({
            key: block.getKey(),
            type: 'unstyled',  // Use 'unstyled' or choose appropriate block type
            text: updatedText,
            characterList: block.getCharacterList().map((char) => {
              // Apply bold style to each character
              return char.set('style', char.getStyle().add('BOLD'));
            }),
          });
        } else if (text.startsWith('** ')) {
          // Convert line to red color and remove '** ' prefix
          const updatedText = text.slice(3);
          return new ContentBlock({
            key: block.getKey(),
            type: 'unstyled',  // Use 'unstyled' or choose appropriate block type
            text: updatedText,
            characterList: block.getCharacterList().map((char) => {
              // Apply red color style to each character
              return char.set('style', char.getStyle().add('COLOR_RED'));
            }),
          });
        } else if (text.startsWith('*** ')) {
          // Convert line to underline and remove '*** ' prefix
          const updatedText = text.slice(4);
          return new ContentBlock({
            key: block.getKey(),
            type: 'unstyled',  // Use 'unstyled' or choose appropriate block type
            text: updatedText,
            characterList: block.getCharacterList().map((char) => {
              // Apply underline style to each character
              return char.set('style', char.getStyle().add('UNDERLINE'));
            }),
          });
        }

        return block;
      })
    );

    // Apply the new content state to the editor
    setEditorState(EditorState.push(newEditorState, newContentState, 'change-block-data'));
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default MyEditor;
