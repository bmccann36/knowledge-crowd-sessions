const { html, renderToString } = require('@popeindustries/lit-html-server');
const { classMap } = require('@popeindustries/lit-html-server/directives/class-map.js');
const { until } = require('@popeindustries/lit-html-server/directives/until.js');

function Layout(data) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>${data.title}</title>
      </head>
      <body>
        ${until(Body(data.api))}
      </body>
    </html>
  `;
}

const bodyRes = Body();
renderToString(bodyRes).then((res) => console.log(res));

function Body() {
  return html`
    <h1>"hi"</h1>
    <p>"oogabooga"</p>
  `;
}
