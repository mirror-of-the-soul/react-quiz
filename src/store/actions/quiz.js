import  axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
      dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')

            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
               quizes.push({
                   id: key,
                   name: `Тест №${index +1}`
               })
            })
               dispatch(fetchQuizesSuccess(quizes))

        } catch (e) {
            dispatch(fetchQuizError(e))
        }
    }
}
export function fetchQuizById(quizId) {
    return async dispatch =>{
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get( `/quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch (fetchQuizError(e))
        }
    }
}
export function fetchQuizSuccess(quiz) {
    return{
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }

}
export function fetchQuizesStart() {
    return{
        type:FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return{
        type:FETCH_QUIZES_SUCCESS,
        quizes                                  //payload, можно написать в формате quizes: quizes  но так как повторяются одни те же значения можно не дублировать.
    }
}
export function fetchQuizError(e) {
    return{
        type:FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return{
        type: QUIZ_SET_STATE,
        answerState, results
    }
}
export function finishQuiz() {
    return{
        type: FINISH_QUIZ
    }
}
export function quizNextQuestion(number) {
    return{
        type: QUIZ_NEXT_QUESTION,
        number
    }

}

export function retryQuiz() {
    return{
        type: QUIZ_RETRY
    }
}
export function quizAnswerClick(answerId) {
    return (dispatch, getState) =>{

        const state = getState().quiz //определили новый локальный стейт для дальнейшей работы
                                                            /*выходит ошибка при двойном клике на правильный ответ, далее будет проверка и устранение данной ошибки*/
        if (state.answerState) {                         //ПРОВЕРКА если в state в answerState находится правильный ответ, то данная функция не должна выполняться
            const key = Object.keys(state.answerState)[0]    //для проверки объявляем переменную и вытаскиваем правильный ответ ферез Object
            if (state.answerState[key] === 'success') {     //если мы выбрали правильный ответ то будем выполнять return для того что бы не заходили в нижеописанную функцию и не было премещения по вопросам
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results  = state.results
        if (question.rightAnswerId === answerId) {        //если правильный ответ равен выбранному (по ИД вопроса)
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'},results))

            const timeout = window.setTimeout( () => {
                if (isQuizFinished(state)) {
                  dispatch(finishQuiz())
                } else {
                  dispatch (quizNextQuestion(state.activeQuestion +1))
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'},results))

        }
    }
}
function isQuizFinished(state) {
    return state.activeQuestion +1 === state.quiz.length
}