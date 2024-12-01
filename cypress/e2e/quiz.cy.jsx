import mockQuestions from '../fixtures/mockData';

describe("Quiz E2E Tests", () => {
    beforeEach(() => {
        // intercept the API requests and respond with the fixture data
        cy.intercept("GET", "**/questions/random", { body: mockQuestions }).as("getQuestions");

        cy.visit("http://localhost:3002");
    });

    it("should dynamically select the correct answer for each question and display the correct score", () => {
        // start quiz
        cy.contains("Start Quiz").should("be.visible").click();
        cy.wait("@getQuestions");

        let correctAnswers = 0;

        // 'set' to keep track of answered questions
        const answeredQuestions = new Set();

        // simulate answering all questions in quiz
        // @ts-ignore
        cy.wrap(mockQuestions).each((question, index) => {
            cy.get('body').then(($body) => {
                // @ts-ignore
                if (!answeredQuestions.has(question.question) && $body.text().includes(question.question)) {
                    // mark question as answered
                    // @ts-ignore
                    answeredQuestions.add(question.question);

                    // display current question
                    // @ts-ignore
                    cy.contains(question.question, { timeout: 5000 }).should("be.visible");

                    // get correct answer for associated question
                    // @ts-ignore
                    const correctAnswer = question.answers.find((a) => a.isCorrect);

                    cy.contains(correctAnswer.text).click();

                    // increment correct answers
                    correctAnswers++;

                    // verify quiz completion
                    if (answeredQuestions.size === mockQuestions.length) {
                        cy.contains("Quiz Completed", { timeout: 5000 }).should("be.visible");
                        cy.contains(`Your score: ${correctAnswers}/10`).should("be.visible");

                        cy.contains("Take New Quiz").click();
                        cy.contains("Start Quiz").should("be.visible");

                        return;
                    }
                }
            });
        });
    });
});