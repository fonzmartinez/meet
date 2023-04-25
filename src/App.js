import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import "./nprogress.css";



class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    showWelcomeScreen: undefined
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const NumEvents = locationEvents.slice(0, this.state.eventCount);
        this.setState({
          events: NumEvents,
          selectedCity: location,
        });
      });
    }
    else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const NumEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: NumEvents,
          eventCount: eventCount,
        });
      });
    }
    else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const NumEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: NumEvents,
          eventCount: eventCount,
        });
      });
    }
    else {
      getEvents().then((events) => {
        const locationEvents = (this.state.locations === "all") ?
          events :
          events.filter((event) => this.state.selectedCity === event.location);
        const NumEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: NumEvents,
          eventCount: eventCount,
        });
      });
    }
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
      true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }


  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          selectedCity={this.state.selectedCity}
          number={this.state.eventCount}
          updateEvents={this.updateEvents}
        />
        {!navigator.onLine &&
          <WarningAlert text='You are currently offline and display has been loaded from cache and may not be up to date.' />
        }
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400} >
            <ScatterChart
              width={400}
              height={400}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;

