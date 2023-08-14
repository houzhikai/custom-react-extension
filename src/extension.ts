import path from "path";
import * as vscode from "vscode";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("test.helloWorld", () => {
    vscode.window.showInformationMessage("add webpack.prod.js file ok1");

    const panel = vscode.window.createWebviewPanel(
      "React",
      "React App",
      vscode.ViewColumn.One,
      {
        retainContextWhenHidden: true,
        enableScripts: true,
      }
    );

    const isProduction =
      context.extensionMode === vscode.ExtensionMode.Production;
    let srcUrl = "";
    // if (isProduction) {
    //   srcUrl = path.join(context.extensionPath, "dist", "index.html");
    //   panel.webview.html = getWebViewContent(srcUrl, panel);
    // } else {
    //   srcUrl = "http://localhost:3001/";
    //   panel.webview.html = getViewContent(srcUrl);
    // }

    srcUrl = path.join(context.extensionPath, "dist", "index.html");
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
    panel.webview.onDidReceiveMessage((message: any) => {
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

export function deactivate() {}
function getViewContent(srcUri: string) {
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

function getWebViewContent(src: string, panel: any) {
  const dirPath = path.dirname(src);
  let html = fs.readFileSync(src, "utf-8");
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<iframe.+?src="|<img.+?src=")(.+?)"/g,
    (m, $1, $2) => {
      const absLocalPath = path.resolve(dirPath, $2);
      const webviewUri = panel.webview.asWebviewUri(
        vscode.Uri.file(absLocalPath)
      );
      const replaceHref = $1 + webviewUri.toString() + '"';
      return replaceHref;
    }
  );
  return html;
}
