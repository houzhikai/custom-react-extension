"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// @ts-expect-error
const vscode = window.acquireVsCodeApi();
function App() {
    const [value, setValue] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        console.log(111);
        window.addEventListener("message", (e) => {
            if (e.data.command === "extension") {
                setValue(e.data.text);
            }
            console.log({ e });
        });
    }, []);
    (0, react_1.useEffect)(() => {
        vscode.postMessage({ command: "start" });
    }, []);
    const handleTest = () => {
        vscode.postMessage({ command: "test-data", text: "test-data" });
    };
    // vscode.postMessage({ command: "test-data", text: "test-data" });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { onClick: handleTest, children: "Webview-react" }), ";", (0, jsx_runtime_1.jsx)("div", { children: value })] }));
}
exports.default = App;
//# sourceMappingURL=App.js.map