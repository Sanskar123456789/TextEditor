import Button from "../Components/Button";
import TextEditor from "../Components/TextEditor";
import Title from "../Components/Title";
import { useEffect, useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

function Main() {

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(()=> {
    const savedContentStateJSON = localStorage.getItem('editorContent');
    if (savedContentStateJSON) {
      const savedContentState = convertFromRaw(JSON.parse(savedContentStateJSON));
      const savedEditorState = EditorState.createWithContent(savedContentState);
      setEditorState(savedEditorState);
    }
  },[])
  
  const handleSaveButton = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem('editorContent', contentStateJSON);
  }

  return (
    <>
      <div className="header">
        <Title titleString={"Draft Js Text Editor"} />
        <Button
          isBtnDisabled={false}
          btnLabel={"Save"}
          btnAction={handleSaveButton}
        />
      </div>
      <TextEditor editorState={editorState} setEditorState={setEditorState}/>
    </>
  );
}

export default Main;
