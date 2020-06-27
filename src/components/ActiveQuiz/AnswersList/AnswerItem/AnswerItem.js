import React from 'react'
import classes from './AnswerItem.css'


const AnswerItem = props => {
const cls = [classes.AnswerItem]

    if (props.state) {
        cls.push(classes[props.state]) /*если у нас есть некоторый state то будем добавлять в массив cls новый элемент classes по ключу [props.state]*/
    }

        return(
            <li
                className={cls.join(' ')}
                onClick={() => props.onAnswerClick(props.answer.id)}>
                {props.answer.text}

            </li>
        )
}


export default AnswerItem