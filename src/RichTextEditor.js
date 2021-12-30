import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";


const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  return (
    <div style={styles.root} className="column">
      <div className="column-header">
        <input />
        <input />

        <button style={styles.bold}>B</button>
        <button style={styles.italic}>I</button>
        <button style={styles.underline}>U</button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <div>
        <input type="radio"/><i className="fas fa-align-left"></i>
        <input type="radio"/><i className="fas fa-align-left"></i>
        <input type="radio"/><i className="fas fa-align-left"></i>
        <input type="radio"/><i className="fas fa-align-left"></i>

        </div>
      </div>
      <div style={styles.editor} className="column-body">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Enter some text..."
        />
      </div>
    </div>
  );
};

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  underline: {
    textDecoration: "underline",
  },
};

export default RichTextEditor;
