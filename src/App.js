import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { Path } from './constants/paths';
import { UserContext } from './context';
import useAuth from './hooks/useAuth';

// Components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const WithAuth = (Component) => {
  const withAuth = (props) => {
    const history = useHistory();
    const { user, loading } = useAuth();

    if (loading) {
      return (
        <div className="flex justify-center items-center w-2/3 mx-auto h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    if (user && [Path.LOGIN, Path.SIGNUP].includes(history.location.pathname)) {
      return <Redirect to={Path.DASHBOARD} />;
    }

    return (
      <UserContext.Provider value={{ user }}>
        <Component {...props} />
      </UserContext.Provider>
    );
  };

  return withAuth;
};

const App = () => {
  // const { user, loading } = useAuth();

  // console.log('app');

  return (
    <Router>
      <Switch>
        <Route exact path={Path.DASHBOARD} component={WithAuth(Dashboard)} />
        <Route exact path={Path.LOGIN} component={WithAuth(Login)} />
        <Route exact path={Path.SIGNUP} component={WithAuth(Signup)} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
