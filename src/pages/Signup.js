import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import useTitle from '../hooks/useTitle';
import { Path } from '../constants/paths';
import { doesUserExist } from '../services/firebase';

const Signup = () => {
  useTitle('Sign Up - instagram');
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [formdata, setFormdata] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { username, fullname, email, password } = formdata;
  const isInvalid = email === '' || password === '';

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    const usernameExist = await doesUserExist(username);

    if (!usernameExist) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUser.user.updateProfile({ displayName: username });

        await firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          username: username.toLocaleLowerCase(),
          fullname,
          emailAddress: email.toLocaleLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        setLoading(false);
        history.push(Path.LOGIN);
      } catch (error) {
        setLoading(false);
        setFormError(error.message);
      }
    } else {
      setLoading(false);
      setFormError('Username is taken');
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

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="username"
              onChange={handleInputChange}
              value={username}
            />
            <input
              aria-label="Enter your fullname"
              type="text"
              placeholder="Fullname"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              name="fullname"
              onChange={handleInputChange}
              value={fullname}
            />
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
              disabled={isInvalid || loading}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
               ${(isInvalid || loading) && 'opacity-50'}`}
            >
              {loading ? 'Loading...' : 'Sign up'}
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Do you have an account?{` `}
            <Link to={Path.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
