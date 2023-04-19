import React, { Component } from "react";
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    number: 32, //default number
    errorText: '',
    events: []
  }

  handleNumberChange = (event) => {
    let inputValue = event.target.value;
    if (inputValue < 1 || inputValue > 32) {
      this.setState({
        number: inputValue,
        errorText: 'Select a number between 1 and 32'
      });
    } else {
      this.setState({
        number: event.target.value,
        errorText: "",
      });
    }

    this.props.updateEvents(this.props.selectedCity, inputValue);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <ErrorAlert text={this.state.errorText} />
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