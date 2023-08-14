"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path_1 = __importDefault(require("path"));
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
function activate(context) {
    let disposable = vscode.commands.registerCommand("test.helloWorld", () => {
        vscode.window.showInformationMessage("add webpack.prod.js file ok1");
        const panel = vscode.window.createWebviewPanel("React", "React App", vscode.ViewColumn.One, {
            retainContextWhenHidden: true,
            enableScripts: true,
        });
        const isProduction = context.extensionMode === vscode.ExtensionMode.Production;
        let srcUrl = "";
        // if (isProduction) {
        //   srcUrl = path.join(context.extensionPath, "dist", "index.html");
        //   panel.webview.html = getWebViewContent(srcUrl, panel);
        // } else {
        //   srcUrl = "http://localhost:3001/";
        //   panel.webview.html = getViewContent(srcUrl);
        // }
        srcUrl = path_1.default.join(context.extensionPath, "dist", "index.html");
        panel.webview.html = getWebViewContent(srcUrl, panel);
        // const updateWebview = () => {
        //   panel.webview.html = getViewContent(srcUrl);
        // };
        // updateWebview();
        // const interval = setInterval(updateWebview, 1000000);
        // panel.onDidDispose(
        //   () => {
        //     clearInterval(interval);
        //   },
        //   null,
        //   context.subscriptions
        // );
        // console.log(1122342435);
        panel.webview.postMessage({});
        panel.webview.onDidReceiveMessage((message) => {
            console.log({ message });
            switch (message.command) {
                case "test-data":
                    vscode.window.showErrorMessage(message.text);
                    break;
                case "start":
                    panel.webview.postMessage({
                        command: "extension",
                        text: "extension",
                    });
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
function getViewContent(srcUri) {
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
     
      <style>
      html, 
      body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          height: 100%;
      }
        .iframeDiv{
          width: 100%;
          height: 100%;
        }
      </style>
    </head>
    <body>
    <script>
    const vscode = acquireVsCodeApi();
  </script>
      <div id='root'></div>
      <iframe id='iframe1' class='iframeDiv' src="${srcUri}" scrolling="auto"></iframe>
    </body>
  </html>`;
}
function getWebViewContent(src, panel) {
    const dirPath = path_1.default.dirname(src);
    let html = fs.readFileSync(src, "utf-8");
    html = html.replace(/(<link.+?href="|<script.+?src="|<iframe.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        const absLocalPath = path_1.default.resolve(dirPath, $2);
        const webviewUri = panel.webview.asWebviewUri(vscode.Uri.file(absLocalPath));
        const replaceHref = $1 + webviewUri.toString() + '"';
        return replaceHref;
    });
    return html;
}
//# sourceMappingURL=extension.js.map