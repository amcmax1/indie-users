import React, { Component } from "react";

async function fetchData(url) {
  let cachedResult = JSON.parse(window.localStorage.getItem(url));
  let data;

  if (cachedResult) {
    data = cachedResult;
  } else {
    let response = await fetch(url);
    data = await response.json();
    window.localStorage.setItem(url, JSON.stringify(data));
  }
  return data;
}

export default class Resource extends React.Component {
  state = {
    loading: false,
    payload: [],
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetchData(this.props.path).then((data) => {
      this.setState({
        payload: data,
        loading: false,
      });
    });
  }

  render() {
    return this.props.render(this.state);
  }
}
