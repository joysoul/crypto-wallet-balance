import React, { Component } from "react";
import Fetch from "./Fetch";

class Exchange extends Component {
  shouldComponentUpdate(props) {
    return !(
      props.to === this.props.to &&
      props.from === this.props.from &&
      props.sum === this.props.sum
    );
  }
  render() {
    const { from, to, sum = 1 } = this.props;
    return (
      <Fetch
        url={`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`}
        handleRes={res => res.json()}
        render={({ pending, error, res }) => {
          return pending
            ? "pending"
            : error
              ? error
              : res
                ? `${Number(Math.round(res[to] * sum)).toLocaleString(
                    "sv-SE"
                  )} ${to}`
                : "wait";
        }}
      />
    );
  }
}

export default Exchange;
