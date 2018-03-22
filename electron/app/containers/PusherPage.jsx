// @flow
import React, { Component } from "react";
import Pusher from "../components/Pusher";

type Props = {};

export default class PusherPage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
  }

  render() {
    return <Pusher />;
  }
}
