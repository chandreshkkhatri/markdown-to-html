import React, { useState } from "react";
import TurndownService from 'turndown';

const CodeViewer = (props) => {
  const [type, setType] = useState("md");
  const turndownService = new TurndownService()

  const processMarkup = (markup) => {
    if (type === "md") {
    return turndownService.turndown(markup);    
    } else {
      return markup;
    }
  }

  const handleChange = (event) => {
    setType(event.target.value);
  }

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
            onChange={handleChange}
            name="type"
            checked={type==='md'}
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
            checked={type==='html'}
          />
          <label style={styles.smallFontSize} htmlFor="html">
            HTML
          </label>
        </div>
      </div>
      <div className="column-body">
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
