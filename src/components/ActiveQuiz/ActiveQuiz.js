import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'


const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>2.</strong>&nbsp;

                 {props.question}
            </span>
            <small>4 из 12</small>
        </p>

        <ul>
           <AnswersList
           answers={props.answers}
           onAnswerClick={props.onAnswerClick}
           />
        </ul>
    </div>
)
export default ActiveQuiz