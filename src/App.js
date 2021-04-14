import React, { useEffect, useState } from 'react';
import './App.scss';
import { IntlProvider } from 'react-intl';
import * as messages from './intl/port.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './Login/Login';
import { CookiesProvider } from 'react-cookie';
import { PrivateRoute } from './Shared/PrivateRoute';
import { Profile } from './Login/Profile';
import { Professor } from './Professor/Professor';
import { customSocket } from './Utils/customSocket';

const App = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const connection = customSocket();
    setSocket(connection);
    // return connection.disconnect();
  }, []);

  return (
    <IntlProvider
      messages={messages.default}
      locale='pt-br'
      defaultLocale='pt-br'
    >
      <CookiesProvider>
        <div className='App-header'>
          <Router>
            <Switch>
              <Route path='/login' component={Login} />
              <PrivateRoute path='/profile'>
                <Profile />
              </PrivateRoute>
              <PrivateRoute path='/professor'>
                <Professor socketConection={socket} />
              </PrivateRoute>
            </Switch>
          </Router>
        </div>
      </CookiesProvider>
    </IntlProvider>
  );
};

export default App;
