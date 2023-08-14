import React, { useEffect, useState } from "react";
// @ts-expect-error
const vscode = window.acquireVsCodeApi();
function App() {
  const [value, setValue] = useState("");
  useEffect(() => {
    console.log(111);
    window.addEventListener("message", (e) => {
      if (e.data.command === "extension") {
        setValue(e.data.text);
      }
      console.log({ e });
    });
  }, []);
  useEffect(() => {
    vscode.postMessage({ command: "start" });
  }, []);

  const handleTest = () => {
    vscode.postMessage({ command: "test-data", text: "test-data" });
  };
  // vscode.postMessage({ command: "test-data", text: "test-data" });
  return (
    <>
      <button onClick={handleTest}>Webview-react</button>;<div>{value}</div>
    </>
  );
}
export default App;
