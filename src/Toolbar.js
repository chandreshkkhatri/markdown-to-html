import React from "react";

function Toolbar({
  onBoldClick,
  onItalicClick,
  onUnderlineClick,
  onToggleColor,
  onToggleFontSize,
  onInsertLink,
  onInsertImage,
  onInsertTable,
  onToggleAlignment,
  onToggleUnorderedList,
  onToggleOrderedList,
  styleMap,
  styles,
}) {
  return (
    <div className="column-header">
      <div style={styles.inlineInputs}>
        <select aria-label="Font family">
          <option value="">Arial</option>
        </select>
      </div>
      <div style={styles.inlineInputs}>
        <select
          onChange={(e) => onToggleFontSize(e.target.value)}
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
          onClick={onBoldClick}
          aria-label="Bold (Ctrl+B)"
        >
          B
        </button>
      </div>
      <div style={styles.inlineInputs}>
        <button
          style={styles.italic}
          onClick={onItalicClick}
          aria-label="Italic (Ctrl+I)"
        >
          I
        </button>
      </div>
      <div style={styles.inlineInputs}>
        <button
          style={styles.underline}
          onClick={onUnderlineClick}
          aria-label="Underline (Ctrl+U)"
        >
          U
        </button>
      </div>
      <div style={styles.inlineInputs}>
        {Object.keys(styleMap)
          .filter((k) => k.endsWith("_TEXT"))
          .map((colorKey) => (
            <button
              key={colorKey}
              style={{ ...styles.button, color: styleMap[colorKey].color }}
              onClick={() => onToggleColor(colorKey)}
              title={`Text color ${styleMap[colorKey].color}`}
              aria-label={`Text color ${styleMap[colorKey].color}`}
            >
              A
            </button>
          ))}
      </div>
      <div style={styles.inlineInputs}>
        <button
          onClick={onInsertLink}
          title="Insert Link"
          aria-label="Insert Link"
        >
          <i className="fas fa-link"></i>
        </button>
      </div>
      <div style={styles.inlineInputs}>
        <button
          onClick={onInsertImage}
          title="Insert Image"
          aria-label="Insert Image"
        >
          <i className="fas fa-images"></i>
        </button>
      </div>
      <div style={styles.inlineInputs}>
        <button
          onClick={() => onToggleAlignment("justify")}
          aria-label="Justify"
        >
          <i className="fas fa-align-justify"></i>
        </button>
        <button
          onClick={() => onToggleAlignment("left")}
          aria-label="Align Left"
        >
          <i className="fas fa-align-left"></i>
        </button>
        <button
          onClick={() => onToggleAlignment("center")}
          aria-label="Align Center"
        >
          <i className="fas fa-align-center"></i>
        </button>
        <button
          onClick={() => onToggleAlignment("right")}
          aria-label="Align Right"
        >
          <i className="fas fa-align-right"></i>
        </button>
      </div>
      <div style={styles.inlineInputs}>
        <button onClick={onToggleUnorderedList} aria-label="Bullet List">
          <i className="fas fa-list-ul"></i>
        </button>
        <button onClick={onToggleOrderedList} aria-label="Numbered List">
          <i className="fas fa-list-ol"></i>
        </button>
      </div>
      <div style={styles.inlineInputs}>
        <button
          onClick={onInsertTable}
          title="Insert Table"
          aria-label="Insert Table"
        >
          <i className="fas fa-table"></i>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
