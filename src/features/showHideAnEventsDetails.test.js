import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let AppWrapper;
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the app has been loaded', () => {

    });

    when('a user sees an event', () => {
      AppWrapper = mount(<App />);
    });

    then('the events details will not be visible', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
    });
  });


  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('an events details has been loaded', () => {
      AppWrapper = mount(<App />)
    });

    when('a user clicks show details button for an event', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    then('detailed info about that event will become visible', () => {
      expect(AppWrapper.find('.event .details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    given('a user has details of an event loaded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    when('a user clicks hide details button for that event', () => {
      AppWrapper.update();
      AppWrapper.find('.event .details-btn').at(0).simulate('click');
    });

    then('info about that event will no longer be visible', () => {
      expect(AppWrapper.find('.event .expanded')).toHaveLength(0);
    });
  });
});



