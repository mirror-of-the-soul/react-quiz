import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'


const AnswersList = props => {
    return(
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index)=>{
            return (
                <AnswerItem
                    key={index}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id]: null} /*передаю state  с проверкой, если в пропс что-то есть и он не пустой,
                                                                           то передаем sate по ансвер айди в противном случае передаем null*/
                />
            )
        }) }
    </ul>
    )
}

export default AnswersList