import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  Modifier,
  AtomicBlockUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

const styleMap = {
  RED_TEXT: { color: "red" },
  BLUE_TEXT: { color: "blue" },
  GREEN_TEXT: { color: "green" },
  ORANGE_TEXT: { color: "orange" },
  PURPLE_TEXT: { color: "purple" },
  FONT_SIZE_12: { fontSize: "12px" },
  FONT_SIZE_14: { fontSize: "14px" },
  FONT_SIZE_16: { fontSize: "16px" },
  FONT_SIZE_18: { fontSize: "18px" },
  FONT_SIZE_20: { fontSize: "20px" },
  FONT_SIZE_24: { fontSize: "24px" },
  FONT_SIZE_28: { fontSize: "28px" },
  FONT_SIZE_32: { fontSize: "32px" },
};

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
    const markup = draftToHtml(
      rawEditorState,
      {},
      undefined,
      (entity) => {
        if (entity.type === "IMAGE") {
          return {
            element: "img",
            attributes: {
              src: entity.data.src,
              alt: entity.data.alt || "",
            },
          };
        }
        if (entity.type === "LINK") {
          return {
            element: "a",
            attributes: {
              href: entity.data.url,
              target: "_blank",
              rel: "noopener noreferrer",
            },
          };
        }
        if (entity.type === "TABLE") {
          return {
            element: false,
            html: entity.data.html,
          };
        }
      },
      (block) => {
        if (block.data && block.data.textAlign) {
          return { style: { textAlign: block.data.textAlign } };
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

  const _onToggleFontSize = (sizeStyle) => {
    if (sizeStyle) {
      handleChange(RichUtils.toggleInlineStyle(editorState, sizeStyle));
    }
  };

  const _onToggleAlignment = (alignment) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    let newContentState = Modifier.setBlockData(contentState, selection, {
      textAlign: alignment,
    });
    handleChange(
      EditorState.push(editorState, newContentState, "change-block-data")
    );
  };

  const _onToggleUnorderedList = () => {
    handleChange(RichUtils.toggleBlockType(editorState, "unordered-list-item"));
  };

  const _onToggleOrderedList = () => {
    handleChange(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const _onInsertImage = () => {
    const url = prompt("Enter image URL");
    if (!url) return;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    handleChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const _onInsertLink = () => {
    const url = prompt("Enter link URL");
    if (!url) return;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      alert("Please select the text you want to link.");
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    newEditorState = RichUtils.toggleLink(newEditorState, selection, entityKey);
    handleChange(newEditorState);
  };

  const _onInsertTable = () => {
    const rows = parseInt(prompt("Number of rows?", "2"), 10);
    const cols = parseInt(prompt("Number of columns?", "2"), 10);
    if (!rows || !cols || rows < 1 || cols < 1) return;
    let table = '<table style="width:100%;border-collapse:collapse;">';
    for (let r = 0; r < rows; r++) {
      table += "<tr>";
      for (let c = 0; c < cols; c++) {
        table +=
          r === 0
            ? '<th style="border:1px solid #ccc;padding:4px;">Header</th>'
            : '<td style="border:1px solid #ccc;padding:4px;">Cell</td>';
      }
      table += "</tr>";
    }
    table += "</table>";
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "TABLE",
      "IMMUTABLE",
      { html: table }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    handleChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  return (
    <div style={styles.root} className="column">
      <div className="column-header">
        <div style={styles.inlineInputs}>
          <select aria-label="Font family">
            <option value="">Arial</option>
          </select>
        </div>
        <div style={styles.inlineInputs}>
          <select
            onChange={(e) => _onToggleFontSize(e.target.value)}
            aria-label="Font size"
          >
            <option value="">Font Size</option>
            <option value="FONT_SIZE_12">12px</option>
            <option value="FONT_SIZE_14">14px</option>
            <option value="FONT_SIZE_16">16px</option>
            <option value="FONT_SIZE_18">18px</option>
            <option value="FONT_SIZE_20">20px</option>
            <option value="FONT_SIZE_24">24px</option>
            <option value="FONT_SIZE_28">28px</option>
            <option value="FONT_SIZE_32">32px</option>
          </select>
        </div>
        <div style={styles.inlineInputs}>
          <button
            style={styles.bold}
            onClick={_onBoldClick}
            aria-label="Bold (Ctrl+B)"
          >
            B
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button
            style={styles.italic}
            onClick={_onItalicClick}
            aria-label="Italic (Ctrl+I)"
          >
            I
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button
            style={styles.underline}
            onClick={_onUnderlineClick}
            aria-label="Underline (Ctrl+U)"
          >
            U
          </button>
        </div>
        {/* Color options */}
        <div style={styles.inlineInputs}>
          {[
            "RED_TEXT",
            "BLUE_TEXT",
            "GREEN_TEXT",
            "ORANGE_TEXT",
            "PURPLE_TEXT",
          ].map((colorKey) => (
            <button
              key={colorKey}
              style={{ ...styles.button, color: styleMap[colorKey].color }}
              onClick={() => _onToggleColor(colorKey)}
              title={`Text color ${styleMap[colorKey].color}`}
              aria-label={`Text color ${styleMap[colorKey].color}`}
            >
              A
            </button>
          ))}
        </div>
        <div style={styles.inlineInputs}>
          <button
            onClick={_onInsertLink}
            title="Insert Link"
            aria-label="Insert Link"
          >
            <i className="fas fa-link"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button
            onClick={_onInsertImage}
            title="Insert Image"
            aria-label="Insert Image"
          >
            <i className="fas fa-images"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button
            onClick={() => _onToggleAlignment("justify")}
            aria-label="Justify"
          >
            <i className="fas fa-align-justify"></i>
          </button>
          <button
            onClick={() => _onToggleAlignment("left")}
            aria-label="Align Left"
          >
            <i className="fas fa-align-left"></i>
          </button>
          <button
            onClick={() => _onToggleAlignment("center")}
            aria-label="Align Center"
          >
            <i className="fas fa-align-center"></i>
          </button>
          <button
            onClick={() => _onToggleAlignment("right")}
            aria-label="Align Right"
          >
            <i className="fas fa-align-right"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button onClick={_onToggleUnorderedList} aria-label="Bullet List">
            <i className="fas fa-list-ul"></i>
          </button>
          <button onClick={_onToggleOrderedList} aria-label="Numbered List">
            <i className="fas fa-list-ol"></i>
          </button>
        </div>
        <div style={styles.inlineInputs}>
          <button
            onClick={_onInsertTable}
            title="Insert Table"
            aria-label="Insert Table"
          >
            <i className="fas fa-table"></i>
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
};

export default RichTextEditor;
