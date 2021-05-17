import React, { useEffect, useState } from 'react';
import './App.scss';
import { IntlProvider } from 'react-intl';
import * as messages from './intl/port.json';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Login } from './Components/Login/Login';
import { CookiesProvider } from 'react-cookie';
import { PrivateRoute } from './Shared/PrivateRoute';
import { Profile } from './Components/Login/Profile';
import { Professor } from './Components/Professor/Professor';
import { customSocket } from './Utils/customSocket';
import { ClassMenu } from './Components/ClassMenu/ClassMenu';
import { Classroom } from './Components/Classroom/Classroom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#094f52',
    },
    secondary: {
      main: '#393d46',
    },
  },
});

const App = () => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const connection = customSocket();
    setSocket(connection);
    // return connection.disconnect();
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
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
                  <Professor socketConnection={socket} />
                </PrivateRoute>
                <PrivateRoute path='/classes'>
                  <ClassMenu socketConnection={socket} />
                </PrivateRoute>
                <PrivateRoute path='/classroom'>
                  <Classroom socketConnection={socket} />
                </PrivateRoute>
              </Switch>
            </Router>
          </div>
        </CookiesProvider>
      </IntlProvider>
    </MuiThemeProvider>
  );
};

export default App;
