let React = require('react');
let ReactDOM = require('react-dom');

let App = React.createClass({
  render: () => {
    return (
      <div>
        <div id="header"></div>
        <div className="container">
          <div className="column">
            <InboxPane />
          </div>
          <div className="column">

          </div>
        </div>
      </div>
    )
  }
});

let InboxPane = React.createClass({
  render: () => {
    return (
      <div id="inbox-pane">
        <h1>Inbox</h1>
        <table>
          <thread>
            <tr>
              <th>Chat Received</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
            <tbody>
              <InboxItem />
            </tbody>
          </thread>
        </table>
      </div>
    );
  }
});

let InboxItem = React.createClass({
  render: () => {
    return (
      <tr>
        <td>5pm</td>
        <td>Rami loves pizza</td>
        <td>Confirmed</td>
      </tr>
    )
  }
})

ReactDOM.render(<App />, document.getElementById("main"));