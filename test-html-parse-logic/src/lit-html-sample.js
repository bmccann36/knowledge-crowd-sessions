const { html, renderToString } = require('@popeindustries/lit-html-server');

const bodyRes = Body();
renderToString(bodyRes).then((res) => console.log(res));

function Body() {
  return html`
    <h1>"hi"</h1>
    <p>"oogabooga"</p>
  `;
}
