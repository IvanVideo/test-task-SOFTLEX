import './Register.css';
import { Link } from 'react-router-dom';
import React from 'react';

function Register({ registerUser, error }) {
  const [values, setValues] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  //Записываем все значения полей
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
  }

  //Сабмитим форму
  const handleSubmitForm = (e) => {
    e.preventDefault();
    registerUser(values)
  }

  return (
    <section className='logIn'>
      <div className='logIn__conteiner'>
        <h1 className='logIn__title'>Тестовая работа</h1>
        <p className='logIn__subtitle'>Рамазанов Иван</p>
        <form className='form logIn__form' onSubmit={handleSubmitForm}>
          <div className='form__box'>
            <label className='form__lable'>Login</label>
            <input
              className='form__input'
              name="login"
              minLength={2}
              onChange={handleChange}
              required />
          </div>
          <div className='form__box'>
            <label className='form__lable'>Password</label>
            <input
              className='form__input'
              name="password"
              minLength={3}
              onChange={handleChange}
              required />
          </div>
          <button disabled={!isValid} className={isValid ? 'form__button form__button_register' : 'form__button_hide-register'}>Зарегестрировать</button>
          <Link className='form__link' to='/'>Войти</Link>
          {
            error ?
              <p className='form__error'>Пользователь с таким логином уже существует</p>
              :
              null
          }
        </form>
      </div>
    </section>
  );
}

export default Register;