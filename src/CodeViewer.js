import React, { useState } from "react";
import TurndownService from "turndown";

const CodeViewer = (props) => {
  const [type, setType] = useState("md");
  const turndownService = new TurndownService();

  const processMarkup = (markup) => {
    if (type === "md") {
      return turndownService.turndown(markup);
    } else {
      return markup;
    }
  };

  const handleDownload = () => {
    const content = processMarkup(props.markup);
    const filename = type === "md" ? "content.md" : "content.html";
    const mimeType = type === "md" ? "text/markdown" : "text/html";

    const element = document.createElement("a");
    const file = new Blob([content], { type: mimeType });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="column">
      <div className="column-header">
        <div style={styles.inlineInputs}>
          <label
            htmlFor="download-type"
            style={{ marginRight: 8, fontWeight: 500 }}
          >
            Download as:
          </label>
          <input
            type="radio"
            value="md"
            id="md"
            onChange={handleChange}
            name="type"
            checked={type === "md"}
          />
          <label style={styles.smallFontSize} htmlFor="md">
            Markdown
          </label>

          <input
            type="radio"
            value="html"
            id="html"
            onChange={handleChange}
            name="type"
            checked={type === "html"}
          />
          <label style={styles.smallFontSize} htmlFor="html">
            HTML
          </label>
          <button
            onClick={handleDownload}
            style={{
              marginLeft: 16,
              padding: "6px 16px",
              borderRadius: 4,
              border: "1px solid #888",
              background: "#f5f5f5",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: 14,
            }}
            aria-label={`Download as ${type === "md" ? "Markdown" : "HTML"}`}
          >
            Download
          </button>
        </div>
      </div>
      <div
        className="column-body"
        style={{
          fontSize: 14,
          background: "#fafafa",
          padding: 12,
          minHeight: 200,
          overflowX: "auto",
          fontFamily: "monospace",
        }}
      >
        {processMarkup(props.markup)}
      </div>
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
