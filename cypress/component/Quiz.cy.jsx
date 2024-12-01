import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
import mockQuestions from '../../cypress/fixtures/mockData.js'; // Import mock data

describe('Quiz Component', () => {
    beforeEach(() => {
        // intercept API calls to return the mock questions
        cy.intercept('GET', '**/questions/random', { body: mockQuestions }).as('getQuestions');
    });

    it('should render the Quiz component and show the first question for the user to answer', () => {
        mount(<Quiz />);
        cy.get('.btn').contains('Start Quiz').click();
        cy.contains(mockQuestions[0].question).should('be.visible'); // verify the first question **dynamically
    });

    it('should allow user to select an answer', () => {
        mount(<Quiz />);
        cy.get('.btn').contains('Start Quiz').click();
        cy.contains(mockQuestions[0].question).should('be.visible');
        cy.contains(mockQuestions[0].answers[0].text).click(); // select the first answer
    });

    it("should calculate and display the user's correct score when the quiz is completed", () => {
        mount(<Quiz />);
        cy.get('.btn').contains('Start Quiz').click();
    
        // track user answer input
        let userCorrectAnswers = 0;
    
        // 'set' tracks answered questions
        const answeredQuestions = new Set();
    
        // wait for questions to load -- then simulate answering them
        cy.wait('@getQuestions').then(({ response }) => {
            // @ts-ignore
            const randomizedQuestions = response.body;
    
            // make sure quiz is 10 questions long (fall-back)
            expect(randomizedQuestions).to.have.length(10);
    
            for (let i = 0; i < randomizedQuestions.length; i++) {
                cy.get('body').then(($body) => {
                    // @ts-ignore
                    randomizedQuestions.forEach((question) => {
                        if (!answeredQuestions.has(question.question)) {
                            if ($body.text().includes(question.question)) {
                                // mark question as answered
                                answeredQuestions.add(question.question);
    
                                // verify the question is visible
                                cy.contains(question.question).should('be.visible');
    
                                // get correct answer for question
                                // @ts-ignore
                                const correctAnswer = question.answers.find((a) => a.isCorrect);
    
                                // simulate selecting the correct answer
                                cy.contains(correctAnswer.text).click();
    
                                // increment correct answers
                                userCorrectAnswers++;
    
                                // verify quiz completion
                                if (answeredQuestions.size === randomizedQuestions.length) {
                                    cy.contains('Quiz Completed', { timeout: 5000 }).should('be.visible');
                                    cy.contains(`Your score: ${userCorrectAnswers}/10`).should('be.visible');
                                }
    
                                return;
                            }
                        }
                    });
                });
            }
        });
    });
});