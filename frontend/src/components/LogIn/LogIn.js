import './LogIn.css';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

function LogIn({ login }) {
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
    login(values)
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
              onChange={handleChange}
              minLength={2}
              required />
          </div>
          <div className='form__box'>
            <label className='form__lable'>Password</label>
            <input
              className='form__input'
              name="password"
              onChange={handleChange}
              minLength={3}
              required />
          </div>
          <button disabled={!isValid} className={isValid ? 'form__button' : 'form__button_hide'}>Войти</button>
          <div className='form__variants'>
            <p className='form__text'>Ещё не зарегистрированы?</p>
            <Link to='/register'>Зарегистрироваться</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LogIn;