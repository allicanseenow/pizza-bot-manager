import { PureComponent } from "react";

export default class Message extends PureComponent {
  render() {
    return (
      <p>{this.props.who} said: "{this.props.text}"</p>
    )
  }
}