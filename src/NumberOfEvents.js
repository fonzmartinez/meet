import React, { Component } from "react";


class NumberOfEvents extends Component {
  state = {
    number: 32, //default number
  }

  handleNumberChange = (event) => {
    const minValue = 0;
    const maxValue = 32;
    let inputValue = event.target.value;
    inputValue = Math.max(Number(minValue), Math.min(Number(maxValue), Number(inputValue)));
    this.setState({ number: inputValue });
    this.props.updateEvents(this.props.selectedCity, inputValue);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="number"
          className="number"
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
      </div>
    );
  }
}


export default NumberOfEvents;