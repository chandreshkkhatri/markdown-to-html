import React, { useState } from "react";
import "./App.css";
import RichTextEditor from "./RichTextEditor";
import CodeViewer from "./CodeViewer";

function App() {
  const [markupState, setMarkupState] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`App${darkMode ? " dark-mode" : ""}`}>
      <button
        onClick={handleToggleDarkMode}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
          borderRadius: 4,
          border: "1px solid #888",
          background: darkMode ? "#222" : "#f5f5f5",
          color: darkMode ? "#fff" : "#222",
          fontWeight: 500,
          cursor: "pointer"
        }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <RichTextEditor updateMarkup={setMarkupState} />
      <CodeViewer markup={markupState} />
    </div>
  );
}

export default App;
