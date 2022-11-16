##Functional Requirements:

1) To start with, the user will be asked to enter the number of spaces in the parking lot. The app then proceeds to draw the parking spaces available in the parking lot - each parking space will show a unique parking space number on it.

2) The user should be able to add a new car registration and parking time when a car arrives.

3) The app should allocate a random space if available.

4) If no lot is empty then show a toast message that Parking is full.

5) On exit of the car, The user should be able to press the parking space to open a new page. The modal should display the calculated parking charges and also a button to deallocate the parking space once payment has been taken. The new page should have a back button in case the user changes their mind. Parking charges are calculated as below:

6) First 2 hours $10

7) $10 is charged for every consecutive hour then after.

8) When the payment taken button is clicked, Make a post request to https://httpstat.us/200 with the body:

  {
    "car-registration": <car_registration_string>,
    "charge": <charge_amount_number>
  }

  Example:

  {
    "car-registration": "TU68 0888",
    "charge": 20
  }

Technical Requirements:

1) Written in and typed in TypeScript.

2) Use a state management library (Ex: Redux, React.Context)

3) Styled and formatted appropriately so that the application is easy to use. Use the https://material-ui.com component library for your components.

4) Write JEST tests that provide 50% or more test coverage of your components.

5) No payment gateway is required - The button to indicate 'Payment Taken' is enough

6) Good coding practices are required - Your code quality will be reviewed.
