Feature: Show and hide event details

Scenario: An event element is collapsed by default
Given the app has been loaded
When a user sees an event
Then the events details will not be visible

Scenario: User can expand an event to see its details
Given an events details has been loaded
When a user clicks show details button for an event
Then detailed info about that event will become visible

Scenario: User can collapse an event to hide its details
Given a user has details of an event loaded
When a user clicks hide details button for that event
Then info about that event will no longer be visible
