import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  let AppWrapper;
  test('When user has not specified a number, 32 is the default number', ({ given, when, then }) => {
    given('total list of events has been loaded', () => {

    });

    when('user has not specified a specific number of events to see', () => {
      AppWrapper = mount(<App />);
    });

    then('user will see first 32 events', () => {
      expect(AppWrapper.state('eventCount')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    given('the number of total list of events has been loaded', async () => {
      AppWrapper = await mount(<App />)
    });

    when('user inputs specified number of events to see', () => {
      AppWrapper.update();
      let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
      const eventObject = { target: { value: 2 } };
      NumberOfEventsWrapper.find('.number').simulate(
        'change',
        eventObject
      );
    });

    then('user will see number of events by chosen number inputted', () => {
      expect(AppWrapper.find('.event')).toHaveLength(2);
    });
  });
});

