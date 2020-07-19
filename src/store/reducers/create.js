import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from '../actions/actionTypes'

const initialState = {
    quiz: []
}


export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
              ...state,
              quiz: [...state.quiz, action.item]  //для того что бы не мутировать массив мы создаем новый массив где разворачиваем стейт и добавлем некий новый item
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state, quiz: []
            }

        default:
            return state

    }
}
