Feature: Specify number of events to view

Scenario: When user has not specified a number, 32 is the default number
Given total list of events has been loaded
When user has not specified a specific number of events to see
Then user will see first 32 events

Scenario: User can change the number of events they want to see
Given the number of total list of events has been loaded
When user inputs specified number of events to see
Then user will see number of events by chosen number inputted