import React, { Component }       from 'react';
import ReactDOM                   from 'react-dom';
import samples                    from './sample-data';

class App extends Component {
  state = {
    "humans": {},
    "stores": {},
    "selectedConversation": []
  };

  loadSampleData = () => {
    this.setState(samples);
    this.setState({selectedConversation: samples.humans["Rami Sayar"].conversations});
  };

  setSelectedConversation = (human_index) => {
    this.setState({
      selectedConversation: this.state.humans[human_index].conversations
    })
  };

  render() {
    return (
      <div>
        <div id="header"></div>
        <button onClick={this.loadSampleData}>Load Sample Data</button>
        <div className="container">
          <div className="column">
            <InboxPane humans={this.state.humans} setSelectedConversation={this.setSelectedConversation} />
          </div>
          <div className="column">
            <ConversationPane conversations={this.state.selectedConversation} />
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
    return <InboxItem key={human} index={human} details={this.props.humans[human]} setSelectedConversation={this.props.setSelectedConversation} />;
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

  setSelected = () => {
    this.props.setSelectedConversation(this.props.index);
  };

  render() {
    return (
      <tr>
        <td><a onClick={this.setSelected}>{this.messageSummary(this.props.details.conversations)}</a></td>
        <td>{this.props.index}</td>
        <td>{this.props.details.orders.sort(this.sortByDate)[0].status}</td>
      </tr>
    );
  }
}

class ConversationPane extends Component {
  renderMessage = (val) => {
    return <Message who={val.who} text={val.text} key={val.time.getTime()} />;
  };

  render() {
    return (
      <div id="conversation-pane">
        <h1>Conversation</h1>
        <h3>Select a conversation from the inbox</h3>
        <div id="messages">
          {this.props.conversations.map(this.renderMessage)}
        </div>
      </div>
    )
  }
}

class Message extends Component {
  render() {
    return (
      <p>{this.props.who} said: "{this.props.text}"</p>
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

ReactDOM.render(<App/>, document.getElementById('main'));
