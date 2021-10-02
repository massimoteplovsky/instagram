import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Path, RouteProtection } from './constants';
import useAuth from './hooks/useAuth';
import { UserContext } from './context';
import ProtectedRoute from './helpers/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// Components
import Loading from './components/Loading';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Switch>
          <ProtectedRoute
            user={user}
            protectionType={RouteProtection.PROTECTED}
            path={Path.DASHBOARD}
            exact
          >
            <Dashboard />
          </ProtectedRoute>
          <Route exact path={Path.PROFILE} component={Profile} />
          <ProtectedRoute
            user={user}
            protectionType={RouteProtection.SEMI_PROTECTED}
            path={Path.LOGIN}
            exact
          >
            <Login />
          </ProtectedRoute>
          <ProtectedRoute
            user={user}
            protectionType={RouteProtection.SEMI_PROTECTED}
            path={Path.SIGNUP}
            exact
          >
            <Signup />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
