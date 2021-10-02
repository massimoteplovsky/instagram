import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import useTitle from '../hooks/useTitle';
import { Path } from '../constants';

const Login = () => {
  useTitle('Login - instagram');
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { email, password } = formdata;
  const isInvalid = email === '' || password === '';

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      history.push(Path.DASHBOARD);
    } catch (error) {
      setLoading(false);
      setFormError(error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata({ ...formdata, [name]: value });
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {formError && (
            <p className="mb-4 text-xs text-center text-red-primary">
              {formError}
            </p>
          )}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="email"
              onChange={handleInputChange}
              value={email}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="password"
              onChange={handleInputChange}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
               ${(isInvalid || loading) && 'opacity-50'}`}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            ${`Don't`} have an account?{` `}
            <Link to={Path.SIGNUP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
