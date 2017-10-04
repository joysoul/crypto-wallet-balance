import React, { Component } from "react";
import Fetch from "./Fetch";

export class Bitcoin extends Component {
  shouldComponentUpdate(props) {
    return !(
      props.address === this.props.address &&
      props.currency === this.props.currency
    );
  }
  render() {
    const { address, render } = this.props;
    return (
      <Fetch
        url={`https://blockchain.info/q/addressbalance/${address}`}
        throttleTime={10}
        init={{ method: "GET", mode: "cors" }}
        handleRes={res => res.text()}
        render={({ pending, error, res }) =>
          render({ pending, error, res, units: res ? res / 100000000 : 0 })}
      />
    );
  }
}

export class Ethereum extends Component {
  shouldComponentUpdate(props) {
    return !(
      props.address === this.props.address &&
      props.currency === this.props.currency
    );
  }
  render() {
    const { address, render } = this.props;
    return (
      <Fetch
        url={`https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`}
        throttleTime={10}
        init={{ method: "GET", mode: "cors" }}
        handleRes={res => res.json()}
        render={({ pending, error, res }) =>
          render({
            pending,
            error,
            res,
            units: res && res.balance ? res.balance / 1000000000000000000 : 0
          })}
      />
    );
  }
}
