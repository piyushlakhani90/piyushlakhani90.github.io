import React, { Component } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from "./History";
import configureStore from './store';

const store = configureStore();
const loading = () => <div>Loading...</div>;
const DefaultLayout = React.lazy(() => import('./container/defaultLayout'));
const Login = React.lazy(() => import('./authantication/login'));
const ForgetPassword = React.lazy(() => import('./authantication/ForgetPassword'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <React.Suspense fallback={loading()}>
            <Routes>
              <Route exact path="/" name="Login Page" element={<DefaultLayout />} />
              <Route exact path="/forget" name="ForgetPassword" element={<ForgetPassword />} />
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;