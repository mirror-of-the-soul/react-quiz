import React, {Component} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

//функция проверки валидности емайл (по запросу в гугле email javascript regex) так же можно установить стороннюю библиотеку например is.js
// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

export default class Auth extends Component{

    state={
        formControls:{
            email: {
                value: '',
                type : 'email',
                label: 'Email',
                errorMessage: 'Введите корректный e-mail',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type : 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

}
    registerHandler = () => {

 }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
    onChangeHandler=(event, controlName)=>{
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value,control.validation)

        formControls[controlName]=control

        this.setState({
            formControls
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map( (controlName, index) => {
            const control = this.state.formControls[controlName]
            return(
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation} //можно в скобках фигурных указать значение true так как для обоих input
                                                          // определено свойство validation или же более универасльно привести к boolean типу с помощью
                                                          // двух (!!) и параметра control.validation
                    errorMessage={control.errorMessage}
                    onChange={ event => this.onChangeHandler(event, controlName)}

                />
            )
        })
          }

    render() {
         return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm} >

                        {/*функция которая вызывает новые input*/}
                      {this.renderInputs()}

                        {/*старые inputы, не нужны будут сгенерированы новые*/}
                        {/*<Input*/}
                        {/*    label="Email"*/}
                        {/*/>*/}

                        {/*<Input*/}
                        {/*    label="Пароль"*/}
                        {/*    errorMessage={'TEST'}*/}
                        {/*/>*/}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                        >
                         Войти
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}

