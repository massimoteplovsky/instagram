import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import FirebaseContext from '../context/firebase';
import useTitle from '../hooks/useTitle';

const Login = () => {
  useTitle('Login - instagram');
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState(null);

  const { email, password } = formdata;
  const isInvalid = email === '' || password === '';

  return <div>Login</div>;
};

export default Login;
