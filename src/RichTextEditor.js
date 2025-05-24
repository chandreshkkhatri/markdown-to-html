import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

// Custom style map for colors
const styleMap = {
  RED_TEXT: {
    color: "red",
  },
  // Add more colors here if needed
  // BLUE_TEXT: {
  //   color: 'blue',
  // },
};

// Function to get block style for alignment (for Editor prop)
function getBlockStyle(block) {
  const textAlign = block.getData().get("textAlign");
  if (textAlign) {
    switch (textAlign) {
      case "left":
        return "align-left";
      case "center":
        return "align-center";
      case "right":
        return "align-right";
      case "justify":
        return "align-justify";
      default:
        return null;
    }
  }
  return null;
}

const RichTextEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    const rawEditorState = convertToRaw(newEditorState.getCurrentContent());
    // Corrected draftToHtml call:
    // 1. Removed styleMap from the entityStyleFn position.
    // 2. Added blockStyleFn for alignment.
    const markup = draftToHtml(
      rawEditorState,
      {}, // hashtagConfig (not using)
      undefined, // customEntityTransform (not using)
      undefined, // entityStyleFn (was incorrectly styleMap)
      (block) => {
        // blockStyleFn for draftjs-to-html
        if (block.data && block.data.textAlign) {
          return {
            style: {
              textAlign: block.data.textAlign,
            },
          };
        }
        return null;
      }
    );
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

  const _onToggleColor = (colorStyle) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, colorStyle));
  };

  const _onToggleAlignment = (alignment) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    // Clear existing alignment before applying a new one if needed,
    // or simply set the new one. For now, just setting.
    let newContentState = Modifier.setBlockData(contentState, selection, {
      textAlign: alignment,
    });
    handleChange(
      EditorState.push(editorState, newContentState, "change-block-data")
    );
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
          <button
            style={styles.redTextButton}
            onClick={() => _onToggleColor("RED_TEXT")}
          >
            A
          </button>
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
          <button onClick={() => _onToggleAlignment("justify")}>
            <i className="fas fa-align-justify"></i>
          </button>
          <button onClick={() => _onToggleAlignment("left")}>
            <i className="fas fa-align-left"></i>
          </button>
          <button onClick={() => _onToggleAlignment("center")}>
            <i className="fas fa-align-center"></i>
          </button>
          <button onClick={() => _onToggleAlignment("right")}>
            <i className="fas fa-align-right"></i>
          </button>
        </div>
      </div>
      <div style={styles.editor} className="column-body">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          placeholder="Enter some text..."
          customStyleMap={styleMap} // For inline styles like color
          blockStyleFn={getBlockStyle} // For block styles like alignment
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
  redTextButton: {
    // Renamed from redText to avoid confusion, this styles the button itself
    color: "red",
    fontWeight: "bold",
  },
};

export default RichTextEditor;
