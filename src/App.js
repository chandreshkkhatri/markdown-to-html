import React, { useState } from "react";
import "./App.css";
import RichTextEditor from "./RichTextEditor";
import CodeViewer from "./CodeViewer";

function App() {
  const [markupState, setMarkupState] = useState("");
  
  return (
    <div className="App">
      <RichTextEditor updateMarkup={setMarkupState} />
      <CodeViewer markup={markupState} />
    </div>
  );
}
export default App;
