import React from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import * as loginService from '../Services/LoginService';

export const Login = ({ location, history }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
        ) {
          errors.username = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await loginService
          .login(values.username, values.password, location, history)
          .catch((error) => {
            console.log(error);
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        /* and other goodies */
      }) => {
        return (
          <form className='Login-form' onSubmit={handleSubmit}>
            <div className='Login-height-organization'>
              <div className='Login-username'>
                <TextField
                  id='username'
                  name='username'
                  variant='outlined'
                  onChange={handleChange}
                  value={values.username}
                  label={<FormattedMessage id='username' />}
                  onBlur={handleBlur}
                  error={!!errors.username}
                  helperText={errors.username}
                />
              </div>
              <div className='Login-password'>
                <TextField
                  id='password'
                  name='password'
                  variant='outlined'
                  type='password'
                  value={values.password}
                  label={<FormattedMessage id='password' />}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </div>
              <div className='Login-confirm'>
                <Button variant='outlined' color='primary' type='submit'>
                  <FormattedMessage id='login' />
                </Button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
