import React, { Component } from "react";
import Fetch from "./Fetch";
import Exchange from "./Exchange";

export class Bitcoin extends Component {
  shouldComponentUpdate(newProps) {
    return !(
      newProps.currency === this.props.currency &&
      newProps.address === this.props.address
    );
  }
  render() {
    const { address, currency, render } = this.props;
    return render(
      <Fetch
        url={`https://blockchain.info/q/addressbalance/${address}`}
        init={{ method: "GET", mode: "cors" }}
        handleRes={res => res.text()}
        render={({ pending, error, res }) =>
          pending ? (
            "pending"
          ) : error ? (
            error
          ) : (
            <span>
              {res / 100000000} BTC ≈{" "}
              <Exchange sum={res / 100000000} from="BTC" to={currency} />
            </span>
          )}
      />
    );
  }
}

export class Ethereum extends Component {
  shouldComponentUpdate(newProps) {
    return !(
      newProps.currency === this.props.currency &&
      newProps.address === this.props.address
    );
  }
  render() {
    const { address, currency, render } = this.props;
    return render(
      <Fetch
        url={`https://api.blockcypher.com/v1/eth/main/addrs/${address}/balance`}
        init={{ method: "GET", mode: "cors" }}
        handleRes={res => res.json()}
        render={({ pending, error, res }) => {
          return pending ? (
            "pending"
          ) : error ? (
            error
          ) : res && res.balance ? (
            <span>
              {res.balance / 1000000000000000000} ≈{" "}
              <Exchange
                sum={res.balance / 1000000000000000000}
                from="ETH"
                to={currency}
              />
            </span>
          ) : (
            "wait"
          );
        }}
      />
    );
  }
}
