import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends Component {
  state = {
      activeQuestion: 0,
      answerState: null, //в данном объекте хранится информация о текущем клике пользователя { [id]: 'succsess' 'error' }

    quiz: [
        {
            question:'какого цвета небо?',
            rightAnswerId: 2, //правильный ответ
            id: 1,
            answers: [                      //массив с ответами
                {text: 'черный', id: 1},
                {text: 'синий', id: 2},
                {text: 'красный', id: 3},
                {text: 'зеленый', id: 4}
            ]
        },
        {
            question:'В каком году основали Санкт-Петербург?',
            rightAnswerId: 3, //правильный ответ
            id: 2,
            answers: [                  //массив с ответами
                {text: '1700', id: 1},
                {text: '1705', id: 2},
                {text: '1703', id: 3},
                {text: '1803', id: 4}
            ]
        }
    ]
  }

  onAnswerClickHandler = (answerId) =>{         /*выходит ошибка при двойном клике на правильный ответ, далее будет проверка и устранение данной ошибки*/
      if (this.state.answerState) {                         //ПРОВЕРКА если в state в answerState находится правильный ответ, то данная функция не должна выполняться
          const key = Object.keys(this.state.answerState)[0]    //для проверки объявляем переменную и вытаскиваем правильный ответ ферез Object
          if (this.state.answerState[key] === 'success') {     //если мы выбрали правильный ответ то будем выполнять return для того что бы не заходили в нижеописанную функцию и не было премещения по вопросам
              return
          }
      }

      const question = this.state.quiz[this.state.activeQuestion]
      if (question.rightAnswerId === answerId) {  //если правильный ответ равен выбранному (по ИД вопроса)
          this.setState({
              answerState: { [answerId]: 'success'}
          })
          const timeout = window.setTimeout( () => {
             if (this.isQuizFinished ()) {
               console.log('Finished')
             } else {
                 this.setState({
                     activeQuestion: this.state.activeQuestion +1,
                     answerState: null,
                 })
             }

             window.clearTimeout(timeout)
              }, 1000)

      } else {
        this.setState({
            answerState: {[answerId]: 'error'}
        })
      }


  }
    isQuizFinished () {
        return this.state.activeQuestion +1 === this.state.quiz.length
    }

  render() {
    return (
      <div className={classes.Quiz}>
         <div className={classes.QuizWrapper}>
           <h1>Ответьте на все вопросы:</h1>
          <ActiveQuiz
          answers={this.state.quiz[this.state.activeQuestion].answers}
          question={this.state.quiz[this.state.activeQuestion].question}
          onAnswerClick={this.onAnswerClickHandler}
          quizLength={this.state.quiz.length}
          answerNumber={this.state.activeQuestion +1}
          state={this.state.answerState}
          />
        </div>
      </div>
    )
  }
}


export default Quiz