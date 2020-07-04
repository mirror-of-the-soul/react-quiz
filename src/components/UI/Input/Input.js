//Input общий компонент

import React from 'react'
import classes from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched      //проверяем если не валидированный контрол и если мы должны его валидировать и если мы его уже потрогали,
                                                    // то это означает что он не валидный
}

const Input = props => {
    const inputType = props.type || 'text' //или если тип не определен то по умолчанию будет тип текст
    const cls=[classes.Input]
    const htmlFor= `${inputType}-${Math.random()}` //для получения каждым input свое индивидальне значение, далее эта переменная будет передана в label

    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }

        </div>
    )
}
export default Input