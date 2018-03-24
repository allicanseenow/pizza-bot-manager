import React, { Component }                       from 'react';
import ReactDOM                                   from 'react-dom';
import { browserHistory, Route, Router, Link }    from 'react-router';
import samples                                    from './sample-data';
import Message                                    from './components/Message';

class App extends Component {
  state = {
    "humans": {},
    "stores": {},
  };

  loadSampleData = () => {
    this.setState(samples);
  };

  componentWillMount() {
    if ('human' in this.props.params) {
      this.loadSampleData();
    }
  }

  render() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <InboxPane humans={this.state.humans} />
          </div>
          <div className="column">
            {/*<ConversationPane conversations={this.state.selectedConversation} />*/}
            {this.props.children || 'Select a Conversation from the Inbox'}
          </div>
          <div className="column">
            <StorePane stores={this.state.stores} />
          </div>
        </div>
      </div>
    )
  }
}

class InboxPane extends Component {
  renderConvoSum = (human) => {
    return <InboxItem key={human} index={human} details={this.props.humans[human]} />;
  };

  render() {
    return (
      <div id="inbox-pane">
        <h1>Inbox</h1>
        <table>
          <thead>
          <tr>
            <th>Chat Received</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.humans).map(this.renderConvoSum)}
          </tbody>
        </table>
      </div>
    )
  }
}

class InboxItem extends Component {
  sortByDate = (a, b) => {
    return a.time > b.time ? -1 : a.time<b.time ? 1 : 0;
  };

  messageSummary = (conversations) => {
    const lastMessage = conversations.sort(this.sortByDate)[0];
    return lastMessage.who + ' said: "' + lastMessage.text + '" @ ' + lastMessage.time.toDateString();
  };

  render() {
    console.log("index ", this.props.index)
    console.log('encoded index ', encodeURIComponent(this.props.index))
    console.log('hei ', /conversation/ + encodeURIComponent(this.props.index))
    return (
      <tr>
        <td><Link to={`/conversation/${encodeURI(this.props.index)}`}>{this.messageSummary(this.props.details.conversations)}</Link></td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    );
  }
}

class ConversationPane extends Component {
  loadSampleData = (human) => {
    this.setState({conversation: samples.humans[human].conversations});
  };

  renderMessage = (conversation) => {
    return <Message who={conversation.who} text={conversation.text} key={conversation.time.getTime()} />;
  };

  componentWillMount() {
    this.loadSampleData(this.props.params.human);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSampleData(nextProps.params.human);
  }

  render() {
    console.log('in convo PANE', this.props.params)
    return (
      <div id="conversation-pane">
        <h1>Conversation</h1>
        <h3>{this.props.params.human}</h3>
        <div id="messages">
          {/*{this.props.conversations.map(this.renderMessage)}*/}
          {this.state.conversation.map(this.renderMessage)}
        </div>
      </div>
    )
  }
}

class StorePane extends Component {
  renderStore = (store) => {
    return <Store key={store} index={store} details={this.props.stores[store]} />;
  };

  render() {
    return (
      <div id="stores-pane">
        <h1>Stores & Ovens</h1>
        <ul>
          {Object.keys(this.props.stores).map(this.renderStore)}
        </ul>
      </div>
    )
  }
}

class Store extends Component {
  getCount = (status) => {
    return this.props.details.orders.filter(function(n){ return n.status === status}).length;
  };

  render() {
    return (
      <li>
        <p>{this.props.index}</p>
        <p>Orders Confirmed: {this.getCount("Confirmed")}</p>
        <p>Orders In The Oven: {this.getCount("In The Oven")}</p>
        <p>Orders Delivered: {this.getCount("Delivered")}</p>
      </li>
    )
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/conversation/:human" component={ConversationPane}></Route>
    </Route>
  </Router>,
  document.getElementById('main')
);
