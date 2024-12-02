# teQwiz
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
- [Description](#description)
- [Installation](#installation-instructions)
- [Usage](#usage)
- [License](#license)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)

## Walkthrough Video
https://drive.google.com/file/d/1GbUwu-pDJpAANfAyWQeihohuO2YwtAyI/view?usp=sharing

## Description
A quiz application for developers to brush up on their coding knowledge with an assortment of 10 random questions and will give users their score upon completion. Built using the MERN stack with a React front end, MongoDB database, and Node/Express server and API, this application also has a suite of Cypress tests for both component testing and end-to-end (E2E) testing.

## Features

	•	The application fetches randomized questions via an API.
	•	The quiz dynamically updates based on user input and tracks scores.
	•	It displays a “Quiz Completed” screen upon answering all questions.
	•	Users can restart the quiz with the “Take New Quiz” button.

## Installation Instructions
Prequisites:
- Node.js
- Cypress

1. Clone the repository
```bash
git clone https://github.com/ikebyers/teQwiz
cd teQwiz
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run start
```
4. Open the Cypress Test Runner:
```bash
npm run cy
```

## Usage
1. Run application and visit website at specified localhost port
```bash
npm run start:dev
```
2. Answer questions by clicking on desired answer
3. Once you've answered all 10 questions, the user's score will be displayed
4. Click to retake quiz

## License 
MIT

## Credits and Sources
** Ike Byers ** - Primary Developer and Testing
Sources:
1. EdX Module 19 Activities - for initial file structuring and reference
2. Cypress Documentation - for understanding the E2E and component testing flow
3. OpenAI - for debugging test code
4. Custom mock data - to simulate backend response for testing

## Tests
1. Component Testing

The component tests are written in Quiz.cy.jsx and ensure:
	•	The first question is displayed correctly when the quiz starts.
	•	The user can select an answer and navigate to the next question.
	•	The “Quiz Completed” screen appears after answering all 10 questions.
	•	The score is displayed dynamically based on user answers.

The E2E tests are written in quiz.cy.jsx and simulate a full user workflow:
	•	Starting the quiz and answering randomized questions.
	•	Dynamically selecting the correct answer for each question.
	•	Verifying the “Quiz Completed” screen and score display.
	•	Restarting the quiz and confirming it resets properly.

## Questions
If you have any questions, please contact me at:
- GitHub: [ikebyers](https://github.com/ikebyers)
- Email: ikebyersmgmt@gmail.com
