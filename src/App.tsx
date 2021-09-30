import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUpPage from './components/registration/signUpPage'
import VerificationPage from './components/verification/verification'
import {PrivateRoute} from './components/privateRoute'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/verification" component={VerificationPage} />
          <Route path="/">
            <SignUpPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
