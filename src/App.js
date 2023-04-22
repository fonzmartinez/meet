import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import "./nprogress.css";



class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    showWelcomeScreen: undefined
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


  /*
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        const NumEvents = events.slice(0, this.state.eventCount);
        this.setState({
          events: NumEvents,
          locations: extractLocations(events),
        });
      }
    });
  }
  */

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
      className="App" />
    return (
      <div className="App">
        {/* Other components such as CitySearch, EventList,...etc */}
        <br></br>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <br></br>
        <NumberOfEvents
          selectedCity={this.state.selectedCity}
          number={this.state.eventCount}
          updateEvents={this.updateEvents}
        />
        {!navigator.onLine &&
          <WarningAlert text='You are currently offline and display has been loaded from cache and may not be up to date.' />
        }
        <br></br>
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;




/*
import React, { Component } from "react";
import "./App.css";
import CitySearch from "./CitySearch";
import EventList from "./EventList";
import NumberOfEvents from "./NumberOfEvents";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import "./nprogress.css";



class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedCity: null,
    showWelcomeScreen: undefined
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

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        const NumEvents = events.slice(0, this.state.eventCount);
        this.setState({
          events: NumEvents,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className='App'>
        <br></br>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <br></br>
        <NumberOfEvents
          selectedCity={this.state.selectedCity}
          number={this.state.eventCount}
          updateEvents={this.updateEvents}
        />
        {!navigator.onLine &&
          <WarningAlert text='You are currently offline and display has been loaded from cache and may not be up to date.' />
        }
        <br></br>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
*/