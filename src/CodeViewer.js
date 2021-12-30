import React, { useState } from "react";

const CodeViewer = () => {
  const [type, setType] = useState("md");

  return (
    <div className="column">
      <div className="column-header">
        <div style={styles.inlineInputs}>
          <button>Download</button>
        </div>
        <div style={styles.inlineInputs}>
          <input
            type="radio"
            value="md"
            id="md"
            onChange={setType}
            name="type"
          />
          <label style={styles.smallFontSize} htmlFor="md">
            Markdown
          </label>

          <input
            type="radio"
            value="html"
            id="html"
            onChange={setType}
            name="type"
          />
          <label style={styles.smallFontSize} htmlFor="html">
            HTML
          </label>
        </div>
      </div>
      <div className="column-body"></div>
    </div>
  );
};

const styles = {
  inlineInputs: {
    display: "inline",
    margin: "5px",
  },
  smallFontSize: {
    fontSize: "12px",
  },
};

export default CodeViewer;
