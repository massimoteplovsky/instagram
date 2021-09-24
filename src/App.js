import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Path } from './constants/paths';

const Login = lazy(() => import('./pages/Login'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <Route exact path={Path.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
