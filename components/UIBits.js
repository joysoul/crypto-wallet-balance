import React, { Component } from "react";
import { Select, Input, Button, List } from "semantic-ui-react";

export const DeleteButton = ({ onDelete }) => (
  <span style={{ cursor: "pointer" }} onClick={onDelete}>
    X
  </span>
);

export const Icon = ({ type }) =>
  type === "BTC" ? (
    <List.Icon name="bitcoin" size="large" verticalAlign="middle" />
  ) : (
    <i className="small icon middle aligned">ETH</i>
  );

export const CurrencyPicker = ({
  defaultValue = "SEK",
  outputCurrencies,
  onCurrencyChange
}) => {
  return [
    "Pick output currency",
    <br />,
    <Select
      placeholder="Select output currency"
      options={outputCurrencies}
      onChange={onCurrencyChange}
      defaultValue={defaultValue}
    />
  ];
};

export const AddressAdder = ({
  addressTypes,
  selectedAddressType,
  onAddressTypeChange,
  onInputAddressChange,
  onAddressAdd,
  inputAddress
}) => {
  return [
    "Add wallet address to watch",
    <br />,
    <Select
      placeholder="Select address type"
      options={addressTypes}
      onChange={onAddressTypeChange}
      defaultValue={""}
    />,
    <br />,
    <br />,
    <Input
      onChange={onInputAddressChange}
      placeholder="Enter address"
      value={inputAddress}
    />,
    <Button
      onClick={onAddressAdd}
      primary
      disabled={!(inputAddress && selectedAddressType)}
    >
      Watch address
    </Button>
  ];
};
