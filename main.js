/** @jsx h */

/*
 * The above directive is
 * responsible for enclosing
 * all the JSX components with
 * a h() function call
 */

// Function h
function h(nodeName, attributes, ...args) {
  const children = args.length? [].concat(...args): null;
  return {nodeName, attributes, children};
}

/*
 * Transforming Virtual DOM objects to
 * the Browser DOM objects
 * Note: This only converts the objects and
 * is not responsible for mounting them on
 * the Browser DOM
 */
function render(virtualNode) {
  if(typeof(virtualNode) === 'string')
    return document.createTextNode(virtualNode);

  let n = document.createElement(virtualNode.nodeName);
  Object.keys(virtualNode.attributes || {}).forEach((key) => {
    n.setAttribute(key, virtualNode.attributes[key]);
  });

  if(virtualNode.children !== null)
    virtualNode.children.forEach(child => n.appendChild(render(child)))

  return n;
}

// JSX to add to the website
const pointsToAdd = [
  'Babel is responsible for breaking down the JSX to JSON object and wrapping it in a h() function call.',
  'The object is then converted to DOM nodes.',
  'These DOM nodes are mounted to give this web page.'
];

function renderListItems(items) {
  return items.map(item => <li>{item}</li>);
}

const vdom = (
  <div id="jsx-added-div">
    <p>This part and the ones below is rendered using JSX</p>
    <p>It is achieved using three simple steps:</p>
    <ul>
      {renderListItems(pointsToAdd)}
    </ul>
  </div>
);

// Converting JSX to Browser DOM node and attaching it
const browserDomObj = render(vdom);
document.body.appendChild(browserDomObj);

// Logging the babel transpiled JSX object to console as a JSON
console.log(JSON.stringify(vdom, null, ''));
