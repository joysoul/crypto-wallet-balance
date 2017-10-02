import React from "react";
import Fetch from "./Fetch";

const Exchange = ({ from, to, sum = 1 }) => (
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

export default Exchange;
