import { useContext, useState } from 'react'
import QuestionsData from '../Data/questions.json'
import AnswerButton from '../Components/Answer/AnswerButton'
import AnswerButtonsWrapper from '../Components/Answer/AnswerButtonsWrapper'
import AnswerResult from '../Components/Answer/AnswerResult'
import AnswerSectionWrapper from '../Components/Answer/AnswerSectionWrapper'
import NextQuestionButton from '../Components/Answer/NextQuestionButton'
import NextQuestionButtonWrapper from '../Components/Answer/NextQuestionButtonWrapper'
import FinishMessage from '../Components/Answer/FinishMessage'
import FinishMessageOverlay from '../Components/Answer/FinishMessageOverlay'
import { MainContext } from '../Context/MainContext'

export default function AnswerCompound() {
  const {
    currentQuestion,
    setCurrentQuestion,
    showAnswerResult,
    setShowAnswerResult,
    correctAnswersNumber,
    setCorrectAnswersNumber,
    wrongAnswersNumber,
    setWrongAnswersNumber,
  } = useContext(MainContext)
  const [finalResult, setFinalResult] = useState('')
  const [showFinishMessage, setShowFinishMessage] = useState(false)
  const [wrongClickedAnswer, setWrongClickedAnswer] = useState('')
  const [correctAnswerPosition, setCorrectAnswerPosition] = useState(0)

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Create and shuffle answers array
  const answersArray = shuffleArray([
    QuestionsData[currentQuestion - 1].correct_answer,
    ...QuestionsData[currentQuestion - 1].incorrect_answers
  ])
  
  // Find the position of correct answer in shuffled array
  const correctAnswer = QuestionsData[currentQuestion - 1].correct_answer

  function checkAnswer(answer: string) {
    if (answer === correctAnswer) {
      setShowAnswerResult!('Correct Answer!')
      setFinalResult('correct')
    }
    if (answer !== correctAnswer) {
      setShowAnswerResult!('Wrong Answer!')
      setFinalResult('wrong')
      setWrongClickedAnswer(answer)
    }
  }

  function changeButtonColor(answer: string) {
    if (answer === correctAnswer) {
      return 'green-button'
    }
    if (answer === wrongClickedAnswer) {
      return 'red-button'
    } else {
      return 'answer-button'
    }
  }

  function doButtonClickActions() {
    if (currentQuestion === QuestionsData.length) {
      if (finalResult === 'correct') {
        setCorrectAnswersNumber!(correctAnswersNumber + 1)
      }
      if (finalResult === 'wrong') {
        setWrongAnswersNumber!(wrongAnswersNumber + 1)
      }
      setFinalResult('')
      return setShowFinishMessage(true)
    }

    setCurrentQuestion!(currentQuestion + 1)
    setShowAnswerResult!('')

    if (finalResult === 'correct') {
      setCorrectAnswersNumber!(correctAnswersNumber + 1)
    }
    if (finalResult === 'wrong') {
      setWrongAnswersNumber!(wrongAnswersNumber + 1)
    }
    setFinalResult('')
  }

  return (
    <>
      <AnswerSectionWrapper>
        <AnswerButtonsWrapper>
          {answersArray.map((answer: string, index: number) => (
            <AnswerButton
              key={index}
              disabled={showAnswerResult !== ''}
              onClick={() => checkAnswer(answer)}
              className={
                finalResult === '' ? 'answer-button' : changeButtonColor(answer)
              }
            >
              {decodeURIComponent(answer)}
            </AnswerButton>
          ))}
        </AnswerButtonsWrapper>
        <AnswerResult>{showAnswerResult}</AnswerResult>
        <NextQuestionButtonWrapper>
          {showAnswerResult === '' ? null : (
            <NextQuestionButton onClick={doButtonClickActions}>
              Next Question
            </NextQuestionButton>
          )}
        </NextQuestionButtonWrapper>
      </AnswerSectionWrapper>
      {showFinishMessage ? (
        <FinishMessageOverlay>
          <FinishMessage />
        </FinishMessageOverlay>
      ) : null}
    </>
  )
}
