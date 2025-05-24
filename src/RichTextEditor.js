import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

const RichTextEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawEditorState = convertToRaw(newEditorState.getCurrentContent());
    const markup = draftToHtml(rawEditorState);
    props.updateMarkup(markup);
  };
  const _onBoldClick = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicClick = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onUnderlineClick = () => {
    handleChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  return (
    <div style={styles.root} className="column">
      <div className="column-header">
        <div style={styles.inlineInputs}>
          <select>
            <option value="">Arial</option>
          </select>
        </div>
        <div style={styles.inlineInputs}>
          <select>
            <option value="">Normal Text</option>
          </select>
        </div>
        <div style={styles.inlineInputs}>
          <button style={styles.bold} onClick={_onBoldClick}>
            B
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button style={styles.italic} onClick={_onItalicClick}>
            I
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button style={styles.underline} onClick={_onUnderlineClick}>
            U
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button style={styles.redText}>A</button>
        </div>
        <div style={styles.inlineInputs}>
          <button>
            <i className="fas fa-link"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button>
            <i className="fas fa-table"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button>
            <i className="fas fa-images"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button>
            <i className="fas fa-align-justify"></i>
          </button>
          <button>
            <i className="fas fa-align-left"></i>
          </button>
          <button>
            <i className="fas fa-align-center"></i>
          </button>
          <button>
            <i className="fas fa-align-right"></i>
          </button>
        </div>
      </div>
      <div style={styles.editor} className="column-body">
        <Editor
          editorState={editorState}
          onChange={handleChange}
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
    backgroundColor: "#fff",
    color: "#000",
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
  inlineInputs: {
    display: "inline",
    margin: "5px",
  },
  redText: {
    color: "red",
  },
};

export default RichTextEditor;
