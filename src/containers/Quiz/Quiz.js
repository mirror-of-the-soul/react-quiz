import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends Component {
  state = {
    quiz: [
        {
            question:'какого цвета небо?',
            rightAnswerId: 2,
            answers: [
                {text: 'черный', id: 1},
                {text: 'синий', id: 2},
                {text: 'красный', id: 3},
                {text: 'зеленый', id: 4}
            ]
        }
    ]
  }

  onAnswerClickHandler = (answerId) =>{
      console.log('Answer Id', answerId)
  }

  render() {
    return (
      <div className={classes.Quiz}>
         <div className={classes.QuizWrapper}>
           <h1>Ответьте на все вопросы:</h1>
          <ActiveQuiz
          answers={this.state.quiz[0].answers}
          question={this.state.quiz[0].question}
          onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    )
  }
}


export default Quiz