import "./App.css";
import RichTextEditor from "./RichTextEditor";

function App() {
  return (
    <div className="App">
      <RichTextEditor />
      <div className="column">
        <div className="column-header"></div>
        <div className="column-body"></div>
      </div>
    </div>
  );
}

export default App;
