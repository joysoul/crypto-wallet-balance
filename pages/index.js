import React, { Component } from "react";
import Head from "next/head";
import { Image, List, Grid, Divider } from "semantic-ui-react";
import { Bitcoin, Ethereum } from "../components/CoinTypes";
import Exchange from "../components/Exchange";
import {
  DeleteButton,
  CurrencyPicker,
  AddressAdder,
  Icon
} from "../components/UIBits";

const outputCurrencies = [
  { key: "SEK", value: "SEK", flag: "se", text: "SEK" },
  { key: "USD", value: "USD", flag: "us", text: "USD" },
  { key: "EUR", value: "EUR", flag: "eu", text: "EUR" }
];
const addressTypes = [
  { key: "BTC", value: "BTC", text: "Bitcoin" },
  { key: "ETH", value: "ETH", text: "Ethereum" }
];

class App extends Component {
  state = {
    currency: "SEK",
    selectedAddressType: null,
    inputAddress: "",
    addresses: []
  };
  updateCurrency = (event, data) => {
    this.setState({ currency: data.value });
  };
  updateAddressType = (event, data) => {
    this.setState({ selectedAddressType: data.value });
  };
  updateInputAddress = (event, data) => {
    this.setState({ inputAddress: data.value });
  };
  watchAddress = (event, data) => {
    const lsAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const item = {
      type: this.state.selectedAddressType,
      address: this.state.inputAddress
    };
    const addresses = lsAddresses.concat(item);
    this.setState({ addresses, inputAddress: "" });
    localStorage.setItem("addresses", JSON.stringify(addresses));
  };
  deleteAddress = address => {
    const lsAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const addresses = lsAddresses.filter(ad => address !== ad.address);
    this.setState({ addresses });
    localStorage.setItem("addresses", JSON.stringify(addresses));
  };
  handleAddressTypeRef = c => (this.addressTypeRef = c);
  componentDidMount() {
    const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
    this.setState({ addresses });
  }
  render() {
    const {
      addresses,
      currency,
      selectedAddressType,
      inputAddress
    } = this.state;
    return (
      <div style={{ paddingTop: "20px" }}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Wallet watcher</title>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
          />
        </Head>
        <Grid centered>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <Image src="/static/images/header.png" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={12} tablet={8} computer={8}>
              <List divided relaxed style={{ textAlign: "left" }}>
                {addresses.map(address => {
                  const C = address.type === "BTC" ? Bitcoin : Ethereum;
                  return (
                    <C
                      key={address.address}
                      address={address.address}
                      currency={currency}
                      render={({ pending, error, sum, units }) => (
                        <List.Item>
                          <List.Content floated="right">
                            <DeleteButton
                              onDelete={() =>
                                this.deleteAddress(address.address)}
                            />
                          </List.Content>
                          <List.Content floated="right">
                            {units ? (
                              <Exchange
                                from={address.type}
                                to={currency}
                                sum={units}
                              />
                            ) : (
                              "-"
                            )}
                          </List.Content>
                          <Icon type={address.type} />
                          <List.Content>
                            {pending ? "pending" : error ? error : units}
                            <List.Description as="i" className="tiny icon">
                              {address.address}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      )}
                    />
                  );
                })}
              </List>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column mobile={12} tablet={12} computer={8}>
              <CurrencyPicker
                defaultValue="SEK"
                outputCurrencies={outputCurrencies}
                onCurrencyChange={this.updateCurrency}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={12} tablet={12} computer={8}>
              <AddressAdder
                addressTypes={addressTypes}
                onAddressAdd={this.watchAddress}
                selectedAddressType={selectedAddressType}
                onAddressTypeChange={this.updateAddressType}
                onInputAddressChange={this.updateInputAddress}
                inputAddress={inputAddress}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
