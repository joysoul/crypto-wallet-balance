import React from "react";
import Fetch from "./Fetch";

export const Bitcoin = ({ address, render }) => (
  <Fetch
    url={`https://blockchain.info/q/addressbalance/${address}`}
    throttleTime={10}
    init={{ method: "GET", mode: "cors" }}
    handleRes={res => res.text()}
    render={({ pending, error, res }) =>
      render({ pending, error, res, units: res ? res / 100000000 : 0 })}
  />
);

export const Ethereum = ({ address, render }) => (
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
