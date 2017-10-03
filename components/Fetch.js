import React, { Component } from "react";

class Fetch extends Component {
  state = {
    res: null,
    pending: false,
    error: false,
    blocking: false
  };
  componentDidMount() {
    this.fetch(this.props);
  }
  componentWillReceiveProps(props) {
    this.fetch(props);
  }
  setupThrottling(time) {
    if (!time) return;
    this.setState({ blocking: true });
    setTimeout(() => this.setState({ blocking: false }), time * 1000);
  }
  fetch(props) {
    if (this.state.pending) return;
    if (this.state.blocking) return;
    this.setState({ pending: true, error: false, res: null }, () => {
      const req = new Request(
        props.url,
        props.init || { method: "GET", mode: "cors" }
      );
      fetch(req)
        .then(response => {
          this.setupThrottling(props.throttleTime);
          if (response.status === 200 && response.status < 340) {
            return response;
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(props.handleRes)
        .then(res => this.setState({ pending: false, res }))
        .catch(error => {
          this.setState({ pending: false, error: error.message });
        });
    });
  }
  render() {
    return this.props.render({ ...this.state });
  }
}

export default Fetch;
