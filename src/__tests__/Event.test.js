import React from 'react';
import Event from '../Event';
import { mockData } from '../mock-data';
import { shallow } from 'enzyme';



describe('<Event /> component', () => {
  let EventWrapper;
  const event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  })

  test('renders the component', () => {
    expect(EventWrapper).toBeDefined();
  });

  test('summary is rendered correctly', () => {
    const summary = EventWrapper.find('h2.summary');
    expect(summary).toHaveLength(1);
    expect(summary.text()).toBe(event.summary);
  });

  test('event start time is rendered correctly', () => {
    const eventStart = EventWrapper.find('p.event-start');
    expect(eventStart).toHaveLength(1);
    expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
  });

  test('event location is rendered correctly', () => {
    const eventLocation = EventWrapper.find('p.event-location');
    expect(eventLocation).toHaveLength(1);
    expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
  });

  test('event details is expanded and rendered correctly', () => {
    expect(EventWrapper.find('h3.about')).toHaveLength(1);
    expect(EventWrapper.find('a.link')).toHaveLength(1);
    expect(EventWrapper.find('p.description')).toHaveLength(1);
  });

  test('expand event when clicking show details button', () => {
    const detailsButton = EventWrapper.find('button.details-btn');
    expect(detailsButton.text()).toBe('show details');
    detailsButton.simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

});