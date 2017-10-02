import React, { Component } from "react";
import Head from "next/head";
import {
  Image,
  Select,
  Input,
  Button,
  List,
  Grid,
  Divider
} from "semantic-ui-react";
import { Bitcoin, Ethereum } from "../components/CoinTypes";

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
        <Grid padded centered>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <Image src="/static/images/header.png" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8} tablet={16} computer={8}>
              <List
                divided
                relaxed
                style={{ textAlign: "left", overflow: "hidden" }}
              >
                {addresses.map(address => {
                  const C = address.type === "BTC" ? Bitcoin : Ethereum;
                  const Icon =
                    address.type === "BTC"
                      ? () => (
                          <List.Icon
                            name="bitcoin"
                            size="large"
                            verticalAlign="middle"
                          />
                        )
                      : () => <i className="small icon middle aligned">ETH</i>;
                  return (
                    <List.Item key={address.address}>
                      <Icon />
                      <List.Content>
                        <C
                          address={address.address}
                          currency={currency}
                          render={res => <List.Header>{res}</List.Header>}
                        />
                        <List.Description as="i" className="tiny icon">
                          {address.address}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column mobile={8} tablet={16} computer={8}>
              Pick output currency<br />
              <Select
                placeholder="Select output currency"
                options={outputCurrencies}
                onChange={this.updateCurrency}
                defaultValue={"SEK"}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8} tablet={16} computer={8}>
              Add wallet address to watch<br />
              <Select
                placeholder="Select address type"
                options={addressTypes}
                onChange={this.updateAddressType}
                defaultValue={""}
              />
              <br />
              <br />
              <Input
                onChange={this.updateInputAddress}
                placeholder="Enter address"
                value={inputAddress}
              />
              <Button
                onClick={this.watchAddress}
                primary
                disabled={!(inputAddress && selectedAddressType)}
              >
                Watch address
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
