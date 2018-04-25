// @flow
import * as React from "react";
import { Container } from "semantic-ui-react";

// type Props = {
//   children: React.Node
// };

export default class App extends React.Component {
  // props: Props;

  render() {
    return <Container>{this.props.children}</Container>;
  }
}
