import './App.css';
import { useNavigate, Routes, Route } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import Page1 from '../Page1/Page1';
import Register from '../Register/Register';
import React, { useEffect } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/api';

function App() {
  const [data, setData] = React.useState([]); // массив списка задач
  const [loggedIn, setLoggedIn] = React.useState(false); // состояние логирования
  const [currentUser, setCurrentUser] = React.useState([]); // информация о залогированном пользователе
  const [adminValue, setAdminValue] = React.useState(null); // отслеживаем залогинен ли админ
  const [error, setError] = React.useState(false); // статус ошибки запроса
  const navigate = useNavigate();

  //проверка токена пользователя 
  const tokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem("token");
    if (jwt && jwt !== null) {
      mainApi.checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          navigate('/page1');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  });

  // rest api запрос на получение массива задач
  useEffect(() => {
    mainApi.getCards()
      .then((cards) => {
        setData(cards.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //проверяем токен пользователя после обновления
  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  //проверяем админ ли на сайте
  useEffect(() => {
    if (currentUser.name === 'admin') {
      setAdminValue(true);
      return
    }
    setAdminValue(false);
  }, [currentUser]);

  //создаем новую задачу
  const createItem = (card) => {
    mainApi.createCard(card)
      .then((item) => {
        setData([item.data, ...data]);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //Регистрация пользователя
  const registerUser = (data) => {
    return mainApi.register({ name: data.login, password: data.password })
      .then((res) => {
        login(data);
      })
      .catch((err) => {
        setError(true)
        console.log(err);
      });
  };

  //Логин пользователя
  const login = (data) => {
    return mainApi.authorize({ name: data.login, password: data.password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        tokenCheck();
        if (data.login === 'admin') {
          setAdminValue(true);
        } else {
          setAdminValue(false);
        }
        navigate('/page1');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Выход пользователя
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  //Редактирование задачи
  const editRowTable = (data, id) => {
    mainApi.changeCard(data, id)
      .then((cards) => {
        console.log(cards)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<LogIn login={login} />} />
        <Route path='/register' element={<Register registerUser={registerUser} error={error} />} />
        <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route path='/page1' element={
            <Page1 createItem={
              createItem}
              dataItems={data}
              currentUser={currentUser}
              logout={logout}
              adminValue={adminValue}
              editRowTable={editRowTable} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
