import React, { Component } from "react";

class Fetch extends Component {
  state = {
    res: null,
    pending: false,
    error: false
  };
  componentDidMount() {
    this.fetch(this.props);
  }
  componentWillReceiveProps(props) {
    this.fetch(props);
  }
  fetch(props) {
    if (this.state.pending) return;
    this.setState({ pending: true, error: false, res: null }, () => {
      const req = new Request(
        this.props.url,
        this.props.init || { method: "GET", mode: "cors" }
      );
      fetch(req)
        .then(response => {
          if (response.status === 200 && response.status < 340) {
            return response;
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(this.props.handleRes)
        .then(res => this.setState({ pending: false, res }))
        .catch(error =>
          this.setState({ pending: false, error: error.message })
        );
    });
  }
  render() {
    return this.props.render({ ...this.state });
  }
}

export default Fetch;
