import express from "express";
import { renderToString } from "react-dom/server";
import A, { state } from "./A";
import React from 'react'

export const render = () => {
  const content = renderToString(<A></A>);
  return `
      <html>
        <head>
        </head>
        <body style="margin: 0px;padding: 0px;">
          <div id="root">${content}</div>
          <script>
            window.context = {
              state: ${JSON.stringify(state)}
            }
          </script>
          <script type="module" src="client.js"></script>
        </body>
      </html>
    `;
};
let app = express();
app.use(express.static("public"));
app.get("*", function (req, res) {
  console.log("req", req.url);
  const html = render();
  res.send(html);
});

app.listen(4444);
console.log("app", 4444);
