import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SIGNIN } from '../../query';
import './index.scss';

const SignIn = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [signIn, { loading }] = useMutation(SIGNIN, {
    onCompleted: (data) => {
      const {
        token,
        user: { role },
      } = data.signIn;
      if (role === 'admin') {
        localStorage.setItem('token', token);
        history.push('/');
      } else {
        setError('У вас нет права редактирования');
      }
    },
    onError: (e) => {
      setError(e);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    signIn({
      variables: {
        input: { username, password },
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Имя пользователя</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Войти</button>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Неверное имя пользователя или пароль</div>}
      </form>
    </div>
  );
};

export default SignIn;
