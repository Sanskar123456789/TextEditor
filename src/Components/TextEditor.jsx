import React from "react";
import { ContentBlock, EditorState, ContentState, RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor(props) {
  const { editorState, setEditorState } = props;

  const handleContentChange = (newEditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const allBlocks = contentState.getBlocksAsArray();
    let isStateUpdated = false;

    const newContentState = ContentState.createFromBlockArray(
      allBlocks.map((block) => {
        const text = block.getText();
        if (text.startsWith("# ")) {
          isStateUpdated = true;
          const updatedText = text.slice(2);
          console.log(
            ContentBlock({
              key: block.getKey(),
              type: "header-one",
              text: updatedText,
              characterList: block.getCharacterList(),
            })
          );
          return new ContentBlock({
            key: block.getKey(),
            type: "header-one",
            text: updatedText,
            characterList: block.getCharacterList(),
          });
        } else if (text.startsWith("* ")) {
          // isStateUpdated = true;
          // const updatedText = text.slice(2);
          // return new ContentBlock({
          //   key: block.getKey(),
          //   type: "unstyled",
          //   text: updatedText,
          //   characterList: block.getCharacterList().map((char) => {
          //     return char.set("style", char.getStyle().add("BOLD"));
          //   }),
          // });
          RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
        } else if (text.startsWith("** ")) {
          isStateUpdated = true;
          const updatedText = text.slice(3);
          return new ContentBlock({
            key: block.getKey(),
            type: "unstyled",
            text: updatedText,
            characterList: block
              .getCharacterList()
              .map((char) =>
                char.set("style", char.getStyle().add("COLOR_RED"))
              ),
          });
        } else if (text.startsWith("*** ")) {
          isStateUpdated = true;
          const updatedText = text.slice(4);
          return new ContentBlock({
            key: block.getKey(),
            type: "unstyled",
            text: updatedText,
            characterList: block
              .getCharacterList()
              .map((char) =>
                char.set("style", char.getStyle().add("UNDERLINE"))
              ),
          });
        }
        return block;
      })
    );

    if (isStateUpdated) {
      console.log(allBlocks, newContentState);
      setEditorState(
        EditorState.push(newEditorState, newContentState, "change-block-data")
      );
    }
  };

  return (
    <>
      <div className="editor">
        {
          <Editor
            defaultEditorState={editorState}
            editorState={editorState}
            onEditorStateChange={(editorState) => {
              try {
                setEditorState(editorState);
                handleContentChange(editorState);
              } catch (e) {
                setEditorState(EditorState.createEmpty());
              }
            }}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        }
      </div>
    </>
  );
}

export default TextEditor;
