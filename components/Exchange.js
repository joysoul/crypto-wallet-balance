import React from "react";
import Fetch from "./Fetch";

const Exchange = ({ from, to, sum = 1 }) => (
  <Fetch
    url={`https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`}
    handleRes={res => res.json()}
    render={({ pending, error, res }) => {
      return pending
        ? "pending"
        : error ? error : res ? `${Math.round(res[to] * sum)} ${to}` : "wait";
    }}
  />
);

export default Exchange;
