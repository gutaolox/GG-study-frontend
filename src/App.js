import React from 'react';
import './App.scss';
import { IntlProvider } from 'react-intl';
import * as messages from './intl/port.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import { CookiesProvider } from 'react-cookie';
import { PrivateRoute } from './Shared/PrivateRoute';
import { Profile } from './Login/Profile';

function App() {
  return (
    <IntlProvider
      messages={messages.default}
      locale="pt-br"
      defaultLocale="pt-br"
    >
      <CookiesProvider>
        <div className="App-header">
          <Router>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </CookiesProvider>
    </IntlProvider>
  );
}

export default App;
